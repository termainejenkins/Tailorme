import { Resume, ResumeExportOptions } from '@tailorme/shared';
import { jsPDF } from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';

export class ExportService {
  static async exportResume(resume: Resume, options: ResumeExportOptions): Promise<Blob> {
    switch (options.format) {
      case 'pdf':
        return this.exportToPDF(resume, options);
      case 'docx':
        return this.exportToDOCX(resume, options);
      case 'txt':
        return this.exportToTXT(resume, options);
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }
  }

  private static async exportToPDF(resume: Resume, options: ResumeExportOptions): Promise<Blob> {
    const doc = new jsPDF();
    let yOffset = 20;

    // Add title
    doc.setFontSize(24);
    doc.text(resume.masterData.sections.find(s => s.type === 'personal_info')?.title || 'Resume', 20, yOffset);
    yOffset += 20;

    // Add sections
    doc.setFontSize(12);
    resume.masterData.sections
      .filter(section => options.sections.includes(section.id))
      .forEach(section => {
        // Add section title
        doc.setFont(undefined, 'bold');
        doc.text(section.title, 20, yOffset);
        yOffset += 10;

        // Add section content
        doc.setFont(undefined, 'normal');
        const splitText = doc.splitTextToSize(section.content, 170);
        doc.text(splitText, 20, yOffset);
        yOffset += splitText.length * 7 + 10;

        // Check if we need a new page
        if (yOffset > 270) {
          doc.addPage();
          yOffset = 20;
        }
      });

    return doc.output('blob');
  }

  private static async exportToDOCX(resume: Resume, options: ResumeExportOptions): Promise<Blob> {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: resume.masterData.sections.find(s => s.type === 'personal_info')?.title || 'Resume',
                bold: true,
                size: 32,
              }),
            ],
          }),
          ...resume.masterData.sections
            .filter(section => options.sections.includes(section.id))
            .map(section => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: section.title,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: section.content,
                    size: 22,
                  }),
                ],
              }),
            ]).flat(),
        ],
      }],
    });

    return Packer.toBlob(doc);
  }

  private static async exportToTXT(resume: Resume, options: ResumeExportOptions): Promise<Blob> {
    const content = resume.masterData.sections
      .filter(section => options.sections.includes(section.id))
      .map(section => `${section.title}\n\n${section.content}\n\n`)
      .join('');

    return new Blob([content], { type: 'text/plain' });
  }
} 