export interface ResumeSection {
    id: string;
    type: SectionType;
    title: string;
    content: string;
    isVisible: boolean;
    alternatives: string[];
    relevanceScore: number;
    order: number;
    metadata: {
        keywords: string[];
        lastModified: Date;
        created: Date;
    };
}
export declare enum SectionType {
    PERSONAL_INFO = "personal_info",
    SUMMARY = "summary",
    EXPERIENCE = "experience",
    EDUCATION = "education",
    SKILLS = "skills",
    CERTIFICATIONS = "certifications",
    PROJECTS = "projects",
    CUSTOM = "custom"
}
export interface ResumeProfile {
    id: string;
    name: string;
    description: string;
    targetRole: string;
    visibleSections: string[];
    sectionOrder: string[];
    metadata: {
        created: Date;
        lastModified: Date;
        version: number;
    };
}
export interface Resume {
    id: string;
    userId: string;
    masterData: {
        sections: ResumeSection[];
    };
    profiles: ResumeProfile[];
    metadata: {
        created: Date;
        lastModified: Date;
        version: number;
    };
}
export interface ResumeExportOptions {
    format: 'pdf' | 'docx' | 'txt';
    includeMetadata: boolean;
    template: string;
    sections: string[];
}
