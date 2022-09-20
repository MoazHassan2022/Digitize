
export const baseapi = "http://127.0.0.1:8000/api"

export function getSelectedone (sel , all , par) {
    return all.find( (pro) => { return pro[par] === sel; } );
}

export function translator(en) {
    switch (en) {
        case 1: return "كود المشروع";
        case 2: return "اسم الموقع";
        case 3: return "ربنا يستر من الخريطه";
        case 4: return "الرقم المسلسل للكابينه";
        case 5: return "اسم مجموعه النشاط";
        case 6: return "نوع النشاط";
        case 7: return "وحده القياس";
        case 8: return "التقدم اليومي";
        case 9: return "طريقه التسليم";
        case 10: return "ممثل فريق التوصيل";
        case 11: return "مهندس الموقع";
        case 12: return "مشرف الموقع الرئيسي";
        case 13: return "مشرف الموقع المساعد";
    }
}