// ========== LOADER ==========
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('hidden');
    }, 2000);
});

// ========== TYPING EFFECT ==========
const words = {
    ar: ["الفحص والتفتيش", "اختبارات غير هدامة", "فحص الروافع", "ضمان الجودة"],
    en: ["Inspection & Testing", "Non-Destructive Testing", "Crane Inspection", "Quality Assurance"]
};

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout = null;
const typedSpan = document.getElementById('typedText');

function getCurrentLang() {
    return document.documentElement.lang === 'ar' ? 'ar' : 'en';
}

function type() {
    if (!typedSpan) return;
    const lang = getCurrentLang();
    const currentWord = words[lang][typingIndex];

    if (isDeleting) {
        typedSpan.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedSpan.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typingTimeout = setTimeout(type, 2000);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % words[lang].length;
        typingTimeout = setTimeout(type, 400);
        return;
    }

    typingTimeout = setTimeout(type, isDeleting ? 70 : 100);
}

type();

// ========== COUNTER ANIMATION ==========
const counters = document.querySelectorAll('.stat-number');
let countersStarted = false;

function startCounters() {
    if (countersStarted) return;
    const statsSection = document.querySelector('.stats');
    if (!statsSection) return;
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        countersStarted = true;
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let count = 0;
            const increment = target / 45;
            const update = () => {
                count += increment;
                if (count < target) {
                    counter.textContent = Math.floor(count);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };
            update();
        });
    }
}

// ========== SCROLL REVEAL ==========
function reveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
    startCounters();
}

window.addEventListener('scroll', reveal);
reveal();

// ========== FIX ICONS DIRECTION ON LANGUAGE CHANGE ==========
function fixIconsDirection() {
    const isRtl = document.documentElement.dir === 'rtl';
    const socialIconClasses = ['fa-facebook-f', 'fa-linkedin-in', 'fa-twitter', 'fa-instagram', 'fa-whatsapp'];

    const chevronIcons = document.querySelectorAll('.footer-col ul li i.fa-chevron-left, .footer-col ul li i.fa-chevron-right, .nav-links i.fa-chevron-left, .nav-links i.fa-chevron-right');

    chevronIcons.forEach(icon => {
        let isSocialIcon = false;
        socialIconClasses.forEach(cls => {
            if (icon.classList.contains(cls)) isSocialIcon = true;
        });

        if (!isSocialIcon && !icon.closest('.crane-loader') && !icon.closest('.social-icons')) {
            if (isRtl) {
                if (icon.classList.contains('fa-chevron-left')) {
                    icon.style.transform = 'rotate(180deg)';
                } else if (icon.classList.contains('fa-chevron-right')) {
                    icon.style.transform = 'rotate(180deg)';
                }
            } else {
                icon.style.transform = '';
            }
        }
    });
}

// ========== FIX FOOTER LAYOUT FOR LTR ==========
function fixFooterLayout() {
    const isRtl = document.documentElement.dir === 'rtl';

    // معالجة جميع عناصر القائمة في الفوتر
    const allFooterLists = document.querySelectorAll('.footer-col ul');

    allFooterLists.forEach(list => {
        const items = list.querySelectorAll('li');
        items.forEach(item => {
            const icon = item.querySelector('i');
            const textSpan = item.querySelector('span');
            const textNode = item.childNodes[item.childNodes.length - 1];

            if (icon) {
                if (isRtl) {
                    // RTL: icon on right, text on left
                    item.style.display = 'flex';
                    item.style.flexDirection = 'row';
                    item.style.justifyContent = 'flex-start';
                    item.style.alignItems = 'center';
                    icon.style.marginLeft = '10px';
                    icon.style.marginRight = '0';
                    if (textSpan) {
                        textSpan.style.order = '2';
                    }
                } else {
                    // LTR: icon on left, text on right
                    item.style.display = 'flex';
                    item.style.flexDirection = 'row';
                    item.style.justifyContent = 'flex-start';
                    item.style.alignItems = 'center';
                    icon.style.marginRight = '10px';
                    icon.style.marginLeft = '0';
                    if (textSpan) {
                        textSpan.style.order = '2';
                    }
                }
            }
        });
    });

    // معالجة روابط Quick Links (التي ليس فيها أيقونات)
    const quickLinks = document.querySelectorAll('.footer-col ul li a');
    quickLinks.forEach(link => {
        if (isRtl) {
            link.style.display = 'inline-block';
            link.style.textAlign = 'right';
        } else {
            link.style.display = 'inline-block';
            link.style.textAlign = 'left';
        }
    });

    // معالجة أقسام الاتصال (contact-info)
    const contactDivs = document.querySelectorAll('.contact-info div');
    contactDivs.forEach(div => {
        const icon = div.querySelector('i');
        const span = div.querySelector('span');

        if (icon && span) {
            if (isRtl) {
                div.style.display = 'flex';
                div.style.flexDirection = 'row';
                div.style.justifyContent = 'flex-start';
                div.style.alignItems = 'center';
                icon.style.marginLeft = '12px';
                icon.style.marginRight = '0';
                span.style.order = '2';
            } else {
                div.style.display = 'flex';
                div.style.flexDirection = 'row';
                div.style.justifyContent = 'flex-start';
                div.style.alignItems = 'center';
                icon.style.marginRight = '12px';
                icon.style.marginLeft = '0';
                span.style.order = '2';
            }
        }
    });

    // معالجة أيقونات السوشال ميديا
    const socialContainer = document.querySelector('.social-icons');
    if (socialContainer) {
        if (isRtl) {
            socialContainer.style.display = 'flex';
            socialContainer.style.flexDirection = 'row';
            socialContainer.style.justifyContent = 'flex-start';
            socialContainer.style.gap = '16px';
        } else {
            socialContainer.style.display = 'flex';
            socialContainer.style.flexDirection = 'row';
            socialContainer.style.justifyContent = 'flex-start';
            socialContainer.style.gap = '16px';
        }
    }
}

// ========== LANGUAGE TOGGLE ==========
const langBtn = document.getElementById('langToggle');

function updateAllText() {
    const isAr = document.documentElement.lang === 'ar';

    // تحديث كل العناصر التي تحتوي على data-ar
    document.querySelectorAll('[data-ar]').forEach(el => {
        if (el.id === 'langToggle') return;

        const arText = el.getAttribute('data-ar');
        const enText = el.getAttribute('data-en');

        if (arText && enText) {
            const newText = isAr ? arText : enText;

            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                const arPlaceholder = el.getAttribute('data-ar-placeholder');
                const enPlaceholder = el.getAttribute('data-en-placeholder');
                if (arPlaceholder && enPlaceholder) {
                    el.placeholder = isAr ? arPlaceholder : enPlaceholder;
                } else {
                    el.placeholder = newText;
                }
            } else if (el.tagName === 'BUTTON') {
                el.innerText = newText;
            } else if (el.tagName === 'A') {
                el.innerText = newText;
            } else if (el.tagName === 'LI' && el.querySelector('a')) {
                // ليست بحاجة لتغيير لأن الرابط داخلها سيتغير
            } else if (el.querySelector('i') && el.querySelector('span')) {
                const span = el.querySelector('span');
                if (span) span.innerText = newText;
            } else if (el.children.length === 0 || el.tagName === 'P' || el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'LABEL') {
                el.innerText = newText;
            } else if (el.tagName === 'DIV' && !el.querySelector('i')) {
                el.innerText = newText;
            }
        }
    });

    // تحديث روابط Quick Links بشكل خاص
    const quickLinkAnchors = document.querySelectorAll('.footer-col ul li a');
    quickLinkAnchors.forEach(anchor => {
        const arText = anchor.getAttribute('data-ar');
        const enText = anchor.getAttribute('data-en');
        if (arText && enText) {
            anchor.innerText = isAr ? arText : enText;
        }
    });

    // تحديث النصوص الخاصة
    const prefixSpan = document.getElementById('prefixText');
    if (prefixSpan) {
        prefixSpan.innerText = isAr ? prefixSpan.getAttribute('data-ar') : prefixSpan.getAttribute('data-en');
    }

    // إعادة تشغيل تأثير الكتابة
    if (typingTimeout) clearTimeout(typingTimeout);
    typingIndex = 0;
    charIndex = 0;
    isDeleting = false;
    if (typedSpan) typedSpan.textContent = '';
    type();

    // إصلاح اتجاهات الأيقونات
    fixIconsDirection();

    // إصلاح ترتيب الفوتر والكونتكت
    fixFooterLayout();
}

if (langBtn) {
    langBtn.addEventListener('click', () => {
        const isCurrentlyAr = document.documentElement.lang === 'ar';
        const newLang = isCurrentlyAr ? 'en' : 'ar';
        document.documentElement.lang = newLang;
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        langBtn.innerText = newLang === 'ar' ? 'EN' : 'AR';
        updateAllText();
    });
}

// تنفيذ التحديث عند أول تحميل
updateAllText();

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== ACTIVE NAVIGATION LINK ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// ========== FLOATING OIL EFFECT ==========
function createFloatingOil() {
    let container = document.getElementById('floatingOil');
    if (!container) {
        container = document.createElement('div');
        container.id = 'floatingOil';
        container.className = 'floating-oil';
        document.body.appendChild(container);
    }

    container.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const drop = document.createElement('div');
        drop.classList.add('oil-drop-bg');
        drop.style.left = Math.random() * 100 + '%';
        drop.style.width = (Math.random() * 30 + 10) + 'px';
        drop.style.height = drop.style.width;
        drop.style.animationDelay = Math.random() * 10 + 's';
        drop.style.animationDuration = (Math.random() * 15 + 10) + 's';
        container.appendChild(drop);
    }
}
createFloatingOil();

// ========== HEADER SCROLL EFFECT & STYLES ==========
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const style = document.createElement('style');
style.textContent = `
    header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .floating-oil {
        position: fixed;
        pointer-events: none;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .oil-drop-bg {
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(187, 31, 43, 0.08);
        border-radius: 50%;
        animation: floatOil 15s linear infinite;
    }
    @keyframes floatOil {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0.6; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }
    
    /* تحسينات للغة الإنجليزية */
    body[dir="ltr"] .footer-col ul li {
        direction: ltr;
        text-align: left;
        justify-content: flex-start;
    }
    
    body[dir="ltr"] .contact-info div {
        direction: ltr;
        text-align: left;
        justify-content: flex-start;
    }
    
    body[dir="ltr"] .footer-col h4 {
        text-align: left;
    }
    
    body[dir="ltr"] .footer-col p {
        text-align: left;
    }
`;
document.head.appendChild(style);

// ========== RUN FIX ON LOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    fixIconsDirection();
    fixFooterLayout();
}); // ========== FLOATING WHATSAPP BUTTON ==========
(function() {
    // إنشاء زر الواتساب
    const whatsappButton = document.createElement('div');
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.innerHTML = `
        <i class="fab fa-whatsapp"></i>
        <span class="whatsapp-badge">!</span>
        <span class="whatsapp-tooltip" data-ar="الايادي الفنية" data-en="Contact us on WhatsApp">الايادي الفنية</span>
    `;

    // رقم واتساب الشركة (تأكد من الرقم)
    const whatsappNumber = '218911119909'; // الرقم بدون +
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    // إضافة زر الواتساب إلى الصفحة
    document.body.appendChild(whatsappButton);

    // تحديث نص التلميح حسب اللغة
    function updateWhatsappTooltip() {
        const tooltip = whatsappButton.querySelector('.whatsapp-tooltip');
        if (tooltip) {
            const isAr = document.documentElement.lang === 'ar';
            tooltip.textContent = isAr ? tooltip.getAttribute('data-ar') : tooltip.getAttribute('data-en');
        }
    }

    // فتح رابط الواتساب عند النقر
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(whatsappLink, '_blank');
    });

    // إخفاء الزر عند الوصول إلى الفوتر
    function checkFooterVisibility() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // إذا كان الفوتر يظهر في الشاشة
        if (footerRect.top <= windowHeight - 100) {
            whatsappButton.classList.add('hide');
        } else {
            whatsappButton.classList.remove('hide');
        }
    }

    // مراقبة التمرير
    window.addEventListener('scroll', checkFooterVisibility);
    window.addEventListener('resize', checkFooterVisibility);

    // مراقبة تغيير اللغة لتحديث التلميح
    const originalLangToggle = document.getElementById('langToggle');
    if (originalLangToggle) {
        const originalClick = originalLangToggle.onclick;
        originalLangToggle.addEventListener('click', function() {
            setTimeout(updateWhatsappTooltip, 50);
        });
    }

    // تحديث التلميح عند تحميل الصفحة
    setTimeout(updateWhatsappTooltip, 100);

    // التحقق الأولي من الفوتر
    setTimeout(checkFooterVisibility, 200);
})();
// ========== FLOATING WHATSAPP BUTTON ==========
(function() {
    // إنشاء زر الواتساب
    const whatsappButton = document.createElement('div');
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.innerHTML = `
        <i class="fab fa-whatsapp"></i>
        <span class="whatsapp-badge">!</span>
        <span class="whatsapp-tooltip" data-ar="الايادي الفنية" data-en="Contact us on WhatsApp">الايادي الفنية</span>
    `;

    // رقم واتساب الشركة (00218911119909)
    const whatsappNumber = '218911119909';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    // إضافة زر الواتساب إلى الصفحة
    document.body.appendChild(whatsappButton);

    // تحديث نص التلميح حسب اللغة
    function updateWhatsappTooltip() {
        const tooltip = whatsappButton.querySelector('.whatsapp-tooltip');
        if (tooltip) {
            const isAr = document.documentElement.lang === 'ar';
            tooltip.textContent = isAr ? tooltip.getAttribute('data-ar') : tooltip.getAttribute('data-en');
        }
    }

    // فتح رابط الواتساب عند النقر
    whatsappButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.open(whatsappLink, '_blank');
    });

    // إخفاء الزر عند الوصول إلى الفوتر
    function checkFooterVisibility() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // إذا كان الفوتر يظهر في الشاشة
        if (footerRect.top <= windowHeight - 100) {
            whatsappButton.classList.add('hide');
        } else {
            whatsappButton.classList.remove('hide');
        }
    }

    // مراقبة التمرير
    window.addEventListener('scroll', checkFooterVisibility);
    window.addEventListener('resize', checkFooterVisibility);

    // مراقبة تغيير اللغة لتحديث التلميح
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            setTimeout(updateWhatsappTooltip, 100);
        });
    }

    // تحديث التلميح عند تحميل الصفحة
    setTimeout(updateWhatsappTooltip, 100);

    // التحقق الأولي من الفوتر
    setTimeout(checkFooterVisibility, 200);
})();
// ========== FLOATING WHATSAPP BUTTON WITH CHAT WINDOW ==========
(function() {
    // رقم واتساب الشركة
    const whatsappNumber = '218911119909';

    // إنشاء زر الواتساب
    const whatsappButton = document.createElement('div');
    whatsappButton.className = 'whatsapp-float';
    whatsappButton.innerHTML = `
        <i class="fab fa-whatsapp"></i>
        <span class="whatsapp-badge">!</span>
    `;

    // إنشاء نافذة الدردشة
    const chatWindow = document.createElement('div');
    chatWindow.className = 'whatsapp-chat-window';
    chatWindow.innerHTML = `
        <div class="whatsapp-chat-header">
            <i class="fab fa-whatsapp"></i>
            <h4 data-ar="الايادي الفنية" data-en="ALayady-ALfanniyah">الايادي الفنية</h4>
            <button class="close-chat">✕</button>
        </div>
        <div class="whatsapp-chat-body">
            <p data-ar="مرحباً! اكتب رسالتك وسنرد عليك في أقرب وقت" data-en="Hello! Write your message and we'll get back to you soon.">
                مرحباً! اكتب رسالتك وسنرد عليك في أقرب وقت
            </p>
            <textarea id="whatsappMessage" rows="4" placeholder="اكتب رسالتك هنا..."></textarea>
            <button class="send-whatsapp-btn">
                <i class="fab fa-whatsapp"></i>
                <span data-ar="إرسال عبر واتساب" data-en="Send via WhatsApp">إرسال عبر واتساب</span>
            </button>
            <div class="whatsapp-contact-info">
                <i class="fas fa-clock"></i>
                <span data-ar="الرد خلال 24 ساعة" data-en="Reply within 24 hours">الرد خلال 24 ساعة</span>
            </div>
        </div>
    `;

    // إضافة العناصر إلى الصفحة
    document.body.appendChild(whatsappButton);
    document.body.appendChild(chatWindow);

    // فتح/إغلاق النافذة
    let isChatOpen = false;

    function openChat() {
        chatWindow.classList.add('active');
        isChatOpen = true;
        // تركيز على حقل النص
        setTimeout(() => {
            const textarea = document.getElementById('whatsappMessage');
            if (textarea) textarea.focus();
        }, 300);
    }

    function closeChat() {
        chatWindow.classList.remove('active');
        isChatOpen = false;
    }

    // عند الضغط على زر الواتساب
    whatsappButton.addEventListener('click', function(e) {
        e.stopPropagation();
        if (isChatOpen) {
            closeChat();
        } else {
            openChat();
        }
    });

    // زر الإغلاق
    const closeBtn = chatWindow.querySelector('.close-chat');
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeChat();
    });

    // إرسال الرسالة
    const sendBtn = chatWindow.querySelector('.send-whatsapp-btn');
    const messageTextarea = document.getElementById('whatsappMessage');

    function sendMessage() {
        let message = messageTextarea.value.trim();

        if (message === '') {
            // تنبيه بسيط
            messageTextarea.style.borderColor = 'var(--secondary)';
            setTimeout(() => {
                messageTextarea.style.borderColor = '#e2e8f0';
            }, 1500);
            return;
        }

        // ترميز الرسالة للرابط
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // فتح واتساب في نافذة جديدة
        window.open(whatsappUrl, '_blank');

        // تفريغ الحقل وإغلاق النافذة بعد الإرسال
        messageTextarea.value = '';
        closeChat();
    }

    sendBtn.addEventListener('click', sendMessage);

    // إرسال بالضغط على Enter (Ctrl+Enter)
    messageTextarea.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });

    // إغلاق النافذة عند الضغط خارجها
    document.addEventListener('click', function(e) {
        if (isChatOpen && !chatWindow.contains(e.target) && !whatsappButton.contains(e.target)) {
            closeChat();
        }
    });

    // تحديث النصوص حسب اللغة
    function updateChatLanguage() {
        const isAr = document.documentElement.lang === 'ar';

        const headerTitle = chatWindow.querySelector('.whatsapp-chat-header h4');
        const bodyText = chatWindow.querySelector('.whatsapp-chat-body p');
        const sendBtnSpan = chatWindow.querySelector('.send-whatsapp-btn span');
        const contactInfo = chatWindow.querySelector('.whatsapp-contact-info span');

        if (headerTitle) {
            headerTitle.textContent = isAr ? headerTitle.getAttribute('data-ar') : headerTitle.getAttribute('data-en');
        }
        if (bodyText) {
            bodyText.textContent = isAr ? bodyText.getAttribute('data-ar') : bodyText.getAttribute('data-en');
        }
        if (sendBtnSpan) {
            sendBtnSpan.textContent = isAr ? sendBtnSpan.getAttribute('data-ar') : sendBtnSpan.getAttribute('data-en');
        }
        if (contactInfo) {
            contactInfo.textContent = isAr ? contactInfo.getAttribute('data-ar') : contactInfo.getAttribute('data-en');
        }

        // تحديث placeholder
        const isArabic = isAr;
        messageTextarea.placeholder = isArabic ? "اكتب رسالتك هنا..." : "Type your message here...";
    }

    // إخفاء الزر والنافذة عند الوصول إلى الفوتر
    function checkFooterVisibility() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect.top <= windowHeight - 100) {
            whatsappButton.classList.add('hide');
            chatWindow.classList.add('hide');
        } else {
            whatsappButton.classList.remove('hide');
            chatWindow.classList.remove('hide');
        }
    }

    // مراقبة التمرير
    window.addEventListener('scroll', checkFooterVisibility);
    window.addEventListener('resize', checkFooterVisibility);

    // مراقبة تغيير اللغة
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            setTimeout(updateChatLanguage, 100);
        });
    }

    // تحديث اللغة عند التحميل
    setTimeout(updateChatLanguage, 100);

    // التحقق الأولي من الفوتر
    setTimeout(checkFooterVisibility, 200);
})();
// ========== MOBILE MENU TOGGLE ==========
(function() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        // فتح/إغلاق القائمة عند الضغط على الزر
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');

            // منع التمرير في الخلف عند فتح القائمة
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // إغلاق القائمة عند الضغط على أي رابط
        const allLinks = navLinks.querySelectorAll('a');
        allLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // إغلاق القائمة عند الضغط خارجها
        document.addEventListener('click', function(e) {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // إغلاق القائمة عند تغيير حجم النافذة (إذا أصبحت أكبر من 768px)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
})();
// ========== CLICK LOGO TO GO HOME (نسخة أبسط) ==========
(function() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '#'; // يبقيك في نفس الصفحة لكن يعيد التمرير للأعلى
            window.scrollTo(0, 0);
        });
    }
})(); // ========== SIMPLE MODERN LANGUAGE BUTTON ==========
(function() {
    const oldBtn = document.getElementById('langToggle');
    if (!oldBtn) return;

    // إنشاء الزر الجديد
    const newBtn = document.createElement('button');
    newBtn.className = 'modern-lang-btn';
    newBtn.id = 'newLangBtn';
    newBtn.innerHTML = `<i class="fas fa-globe"></i> <span id="langText">EN</span>`;

    // استبدال الزر القديم
    oldBtn.parentElement.replaceChild(newBtn, oldBtn);

    // وظيفة تغيير اللغة
    function switchLanguage() {
        const isAr = document.documentElement.lang === 'ar';
        const newLang = isAr ? 'en' : 'ar';

        document.documentElement.lang = newLang;
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';

        // تحديث النص على الزر
        document.getElementById('langText').innerText = newLang === 'ar' ? 'AR' : 'EN';

        // تحديث كل النصوص في الصفحة
        document.querySelectorAll('[data-ar]').forEach(el => {
            const text = newLang === 'ar' ? el.getAttribute('data-ar') : el.getAttribute('data-en');
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                const arPlace = el.getAttribute('data-ar-placeholder');
                const enPlace = el.getAttribute('data-en-placeholder');
                if (arPlace && enPlace) el.placeholder = newLang === 'ar' ? arPlace : enPlace;
            } else if (el.id !== 'typedText') {
                el.innerText = text;
            }
        });

        // تحديث النص الخاص
        const prefix = document.getElementById('prefixText');
        if (prefix) prefix.innerText = newLang === 'ar' ? prefix.getAttribute('data-ar') : prefix.getAttribute('data-en');
    }

    newBtn.addEventListener('click', switchLanguage);
})();
// Dark Mode Toggle
(function() {
    const darkBtn = document.createElement('div');
    darkBtn.className = 'dark-mode-toggle';
    darkBtn.innerHTML = '<i class="fas fa-moon"></i>';
    document.body.appendChild(darkBtn);

    let isDark = false;
    darkBtn.addEventListener('click', () => {
        isDark = !isDark;
        if (isDark) {
            document.body.classList.add('dark-mode');
            darkBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-mode');
            darkBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
})();