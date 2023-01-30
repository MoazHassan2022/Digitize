
export const baseapi = "https://sites.digitize.org/api" // for deployment just let /api
export const mediaApi = baseapi + "/public" // for deployment just let /public

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

export function explainSteps(en) {
    switch (en) {
        case 0: return ["رساله ترحيبيه", "اهلا بك هل انت مستعد لتسجل استطلاعك اليوم"];
        case 1: return ["اسم الموقع"," قم باختيار اسم الموقع الذي عملت فيه اليوم"];
        case 2: return ["الخريطة (خطوه اختياريه)","يمكنك تحديد المربعات التي تود تسجيل عملك بها او ارفاق صوره لتدل عل عملك"];
        case 3: return ["الرقم المسلسل للكابينة","ادخب رقم الكابينه التي عملت بها اليوم"];
        case 4: return ["اسم مجموعة النشاط","ما اسم مجموعه النشاط التي قمت بها اليوم ؟"];
        case 5: return ["نوع النشاط","اختر من بين انواع النشام المتوافره في مجموعه النشاط التي اخترتها من الخطوه السابقه "];
        case 6: return ["وحدة القياس","اختر وحده القياس التي تود بها التعبير عن عملك"];
        case 7: return ["التقدم اليومي","اكتب رقم يعبر عن مقدار تقدمك اليوم"];
        case 8: return ["طريقة التسليم","كيف تم التسليم اليوم ؟"];
        case 9: return ["ممثل فريق التوصيل","من كان ممثل فريق التوصيل ؟"];
        case 10: return ["مهندس الموقع","من هو مهندس الموقع ؟"];
        case 11: return ["مشرف الموقع الرئيسي","اختر مشرف الموقع الرئيسي"];
        case 12: return ["مشرف الموقع المساعد","اختر مشرف الموقع المساعد"];
        case 13: return ["راجع ما اخترته قبل الارسال","من فضلك راجع اختياراتك بتركيز. يمكنك العوده و تصحيح ما فعلت"];

        default: return "";
    }
}