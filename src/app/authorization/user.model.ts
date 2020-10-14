
enum Gender {
    male = 'MALE',
    female = 'FEMALE',
    na = 'NA'
}

enum Credit {
    credit = 'CREDIT',
    mainstream = 'MAINSTREAM',
    na = 'NA'
}

export interface User {
    _id: string;

    name: string;
    email: string;
    password: string; 

    member?: string;
    level: string;

    mobile?: string;
    birthDate?: Date;
    nationalId?: string;
    gender?: Gender;

    
    university?: string;
    faculty?: string;
    department?: string;
    credit?: Credit;
    graduationYear?: string;
    collegeId?: string;

    emergencyContact_name?: string;
    emergencyContact_relation?: string;
    emergencyContact_mobile?: string;

    profileComplete: boolean;
}


