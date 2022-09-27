
export const baseapi = "/api"

export function getSelectedone (sel , all , par) {
    return all.find( (pro) => { return pro[par] === sel; } );
}

export function translator(en) {
    switch (en) {
        case 0: return "اهلا بك";
        case 1: return "كود المشروع";
        case 2: return "اسم الموقع";
        case 3: return "الخريطـة";
        case 4: return "الرقم المسلسل للكابينة";
        case 5: return "اسم مجموعة النشاط";
        case 6: return "نوع النشاط";
        case 7: return "وحدة القياس";
        case 8: return "التقدم اليومي";
        case 9: return "طريقة التسليم";
        case 10: return "ممثل فريق التوصيل";
        case 11: return "مهندس الموقع";
        case 12: return "مشرف الموقع الرئيسي";
        case 13: return "مشرف الموقع المساعد";
        case 14: return "راجع ما اخترتة قبل الارسال";
        default: return "";
    }
}