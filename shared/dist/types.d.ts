export interface ResumeSection {
    id: string;
    type: 'personal_info' | 'summary' | 'experience' | 'education' | 'skills' | 'certifications' | 'projects' | 'custom';
    title: string;
    content: string;
    isVisible: boolean;
    alternatives?: string[];
    relevanceScore?: number;
    order: number;
    metadata: {
        keywords?: string[];
        lastModified: Date;
        created: Date;
    };
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
