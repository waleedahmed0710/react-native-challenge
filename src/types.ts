export interface UserData {
    name?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
}

export interface ServicesData {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface BusinessData {
    name?: string;
    description?: string;
}
export interface BusinessData {
    id: number;
    business: BusinessData;
    created_at: string;
    tags: string;
}