
export const baseapi = "http://127.0.0.1:8000/api"
export const mediaApi = ""



export function getSelectedone (sel , all , par) {
    return all.find( (pro) => { return pro[par] === sel; } );
}

export function translator(en) {
    switch (en) {
        case 0: return "أهلا بك";
        case 1: return "اسم الموقع";
        case 2: return "الخريطة (يمكنك تخطيها بالضغط عل السهم)";
        case 3: return "الرقم المسلسل للكابينة";
        case 4: return "اسم مجموعة النشاط";
        case 5: return "نوع النشاط";
        case 6: return "وحدة القياس";
        case 7: return "التقدم اليومي";
        case 8: return "طريقة التسليم";
        case 9: return "ممثل فريق التوصيل";
        case 10: return "مهندس الموقع";
        case 11: return "مشرف الموقع الرئيسي";
        case 12: return "مشرف الموقع المساعد";
        case 13: return "راجع ما اخترته قبل الارسال";
        default: return "";
    }
}