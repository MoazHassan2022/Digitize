export const baseapi = "/api" // for deployment just let /api
export const mediaApi = baseapi + "/public" // for deployment just let /public
export const AppName = "Digitize"
export const LogoPath = "/Assets/Digitize.png"
export const LogoIconPath = "/Assets/logoicon.ico"


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
        case 0: return ["رسالة ترحيبية", "أهلا بك هل أنت مستعد لتسجل استطلاعك اليوم"];
        case 1: return ["اسم الموقع"," قم باختيار اسم الموقع الذي عملت فيه اليوم"];
        case 2: return ["الخريطة (خطوة اختيارية)","يمكنك تحديد المربعات التي تود تسجيل عملك بها او ارفاق صورة لتدل عل عملك"];
        case 3: return ["الرقم المسلسل للكابينة","أدخل رقم الكابينة التي عملت بها اليوم"];
        case 4: return ["اسم مجموعة النشاط","ما اسم مجموعة النشاط التي قمت بها اليوم ؟"];
        case 5: return ["نوع النشاط","اختر من بين أنواع النشاط المتوافرة في مجموعة النشاط التي اخترتها من الخطوة السابقة "];
        case 6: return ["وحدة القياس","اختر وحدة القياس التي تود بها التعبير عن عملك"];
        case 7: return ["التقدم اليومي","اكتب رقم يعبر عن مقدار تقدمك اليوم"];
        case 8: return ["طريقة التسليم","كيف تم التسليم اليوم ؟"];
        case 9: return ["ممثل فريق التوصيل","من كان ممثل فريق التوصيل ؟"];
        case 10: return ["مهندس الموقع","من هو مهندس الموقع ؟"];
        case 11: return ["مشرف الموقع الرئيسي","اختر مشرف الموقع الرئيسي"];
        case 12: return ["مشرف الموقع المساعد","اختر مشرف الموقع المساعد"];
        case 13: return ["راجع ما اخترته قبل اﻹرسال","من فضلك راجع اختياراتك بتركيز. يمكنك العودة و تصحيح ما فعلت"];

        default: return "";
    }
}