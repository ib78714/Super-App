import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Navigation, MapPin } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

// 🗺️ قاعدة بيانات المناطق والأماكن المشهورة وكيفية الوصول
const placesDB = [
  {
    keywords: ['معز', 'المعز', 'خان الخليلي', 'الجمالية', 'الحسين'],
    nameAr: "شارع المعز وخان الخليلي",
    descriptionAr: "منطقة تاريخية إسلامية ساحرة مليانة كافيهات ورسومات أثرية ومساجد فاطمية.",
    howToGetAr: "اركب الخط الثالث للمترو وانزل محطة (باب الشعرية) وتمشى 10 دقائق، أو انزل محطة (العتبة) واركب ميكروباص للحسين.",
    highlightsAr: ["مسجد الحاكم بأمر الله", "بيت السحيمي", "قهوة الفيشاوي"],
  },
  {
    keywords: ['عاصمة', 'العاصمة', 'الادارية', 'الفنون والثقافة'],
    nameAr: "العاصمة الإدارية الجديدة",
    descriptionAr: "مدينة حديثة متطورة تضم البرج الأيقوني ومدن الفنون والثقافة والحي الحكومي.",
    howToGetAr: "اركب الخط الثالث للمترو حتى محطة (عدلي منصور)، ومنها اركب القطار الكهربائي الخفيف (LRT) للوصول مباشرة.",
    highlightsAr: ["البرج الأيقوني", "مدينة الفنون والثقافة", "مسجد الفتاح العليم"],
  },
  {
    keywords: ['تجمع', 'التجمع', 'كايرو فستيفال', 'الخامس', 'cfc'],
    nameAr: "التجمع الخامس (القاهرة الجديدة)",
    descriptionAr: "منطقة راقية تضم أشهر المولات والمطاعم والمتنزهات العصرية.",
    howToGetAr: "اركب المترو لمحطة (الشهداء أو سراي القبة) ومنها اتوبيسات مواصلات مصر المتجهة للتجمع، أو اركب الـ BRT من الدائري.",
    highlightsAr: ["كايرو فستيفال سيتي", "شارع التسعين", "مول 5A"],
  },
  {
    keywords: ['زمالك', 'الزمالك', 'برج القاهرة', 'الأوبرا'],
    nameAr: "حي الزمالك وبرج القاهرة",
    descriptionAr: "جزيرة وسط النيل هادئة ومليانة كافيهات راقية، معارض فنون، وبرج القاهرة.",
    howToGetAr: "اركب الخط الثالث للمترو وانزل محطة (صفاء حجازي) بالزمالك مباشرة، أو انزل محطة (الأوبرا) بالخط الثاني وتمشى للبرج.",
    highlightsAr: ["برج القاهرة", "دار الأوبرا المصرية", "حديقة الأسماك"],
  },
  {
    keywords: ['أهرامات', 'اهرامات', 'الجيزة', 'المتحف الكبير', 'متحف'],
    nameAr: "أهرامات الجيزة والمتحف المصري الكبير",
    descriptionAr: "أعظم عجائب الدنيا السبع القديمة والمتحف الأكبر في العالم للحضارة المصرية.",
    howToGetAr: "اركب الخط الثاني للمترو وانزل محطة (الجيزة) أو (فيصل)، ومنها اركب أتوبيس أو ميكروباص لشارع الهرم مباشر للمتحف والأهرامات.",
    highlightsAr: ["الأهرامات الثلاثة ومجلس أبو الهول", "المتحف المصري الكبير"],
  }
];

export const TransitChatbot = () => {
  const { language } = useAppStore();
  const isAr = language === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: isAr 
        ? 'أهلاً بك! أنا دليل الطرق والمناطق الذكي 🗺️.\nاكتب لي اسم أي منطقة (زي: شارع المعز، الزمالك، العاصمة الإدارية، التجمع) وهشرح لك إزاي تروحها وأفضل الأماكن هناك!' 
        : 'Welcome! Type any location name (e.g., Zamalek, New Capital, Pyramids) and I will tell you how to reach it & what to visit!'
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      const lower = userText.toLowerCase();
      const match = placesDB.find(place => place.keywords.some(k => lower.includes(k)));

      let botReply = "";

      if (match) {
        botReply = ` **${match.nameAr}**\n\n📝 **عن المنطقة:** ${match.descriptionAr}\n\n🚆 **إزاي تروحها؟**\n${match.howToGetAr}\n\n✨ **أهم المعالم هناك:**\n${match.highlightsAr.map(h => `• ${h}`).join('\n')}`;
      } else {
        botReply = isAr 
          ? `يا بطل كتبت: "${userText}" \nعشان أساعدك بدقة، جرب تسأل عن مناطق معروفة زي: (شارع المعز، الزمالك، الأهرامات، العاصمة الإدارية، التجمع، أو أسعار تذاكر المترو).`
          : `I couldn't find exact details for "${userText}". Try asking about popular spots like Zamalek, Pyramids, New Capital, or Metro fares.`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botReply }]);
    }, 400);
  };

  return (
    <div className="fixed bottom-5 left-5 rtl:left-5 ltr:right-5 z-50 font-sans">
      
      {/* 🔘 زر الفتح */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-4 py-3.5 rounded-full shadow-2xl transition-all transform hover:scale-105 border border-indigo-400/30"
        >
          <Sparkles className="animate-spin text-amber-300" size={18} />
          <span className="text-xs font-black">{isAr ? 'دليل المناطق والطرق ' : 'City Guide AI'}</span>
          <MessageSquare size={18} />
        </button>
      )}

      {/* 💬 نافذة الشات */}
      {isOpen && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-[88vw] sm:w-88 h-[420px] rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-xl">
                <Navigation size={18} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-black">{isAr ? 'مرشد الطرق والمناطق الذكي' : 'AI Route & Area Guide'}</h3>
                <span className="text-[10px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  {isAr ? 'جاهز للوصف والاتجاهات' : 'Ready'}
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg">
              <X size={16} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-3 overflow-y-auto space-y-3 flex-1 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center shrink-0 mt-1">
                    <Bot size={12} />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-line leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none font-bold'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-2.5 border-t border-slate-100 dark:border-slate-800 flex gap-2 bg-slate-50 dark:bg-slate-900/50">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isAr ? 'اكتب مكان (مثلاً: الزمالك، المعز)...' : 'Type a destination...'}
              className="flex-1 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-3 py-2 rounded-xl text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-md"
            >
              <Send size={14} className="rtl:rotate-180" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};