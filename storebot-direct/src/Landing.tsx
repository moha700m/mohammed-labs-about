import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Check, ChevronDown, MessageCircle, Send, ShoppingBag, Sparkles, X, Zap } from 'lucide-react';

type Role = 'user' | 'assistant';
type Product = { name: string; price: number; reason: string };
type ChatMessage = { role: Role; content: string; products?: Product[] };

const prompts = [
  'أبي سماعة للرياضة بحدود 300 ريال',
  'أحتاج هدية رجالية رسمية',
  'وش أفضل منتج للبشرة الحساسة؟',
];

const benefits = [
  ['يفهم متجرك', 'يتعلّم من المنتجات والأسعار والسياسات التي تعطيه إياها.'],
  ['يبيع مو بس يرد', 'يسأل عن الاحتياج ثم يرشّح الأنسب ويقود العميل للطلب.'],
  ['يرد في لحظتها', 'ما يخلي الزائر ينتظر الرد اليدوي ويطلع من المتجر.'],
  ['يبقى معك', 'بعد التركيب أنت عميل عندنا، وإذا واجهتك مشكلة تواصل معنا.'],
];

const faqs = [
  ['هل يفهم منتجات متجري؟', 'نعم. نجهزه على محتوى متجرك ومنتجاتك وسياساتك حتى تكون إجاباته مرتبطة بما تبيعه فعلاً.'],
  ['هل يقدر يرشح منتج للعميل؟', 'نعم. يقدر يسأل العميل عن احتياجه وميزانيته ثم يرشح الأنسب من المعلومات المتاحة له.'],
  ['هل 499 ر.س اشتراك شهري؟', '499 ر.س هي تكلفة التجهيز والتركيب دفعة واحدة. إذا احتاج تشغيل البوت خدمة طرف ثالث مدفوعة أو استهلاك نموذج AI مدفوع، نوضح تكلفتها قبل التفعيل.'],
  ['إذا صار فيه مشكلة؟', 'تواصل معنا مباشرة. بعد الشراء أنت أحد عملائنا ونساعدك في المشاكل التشغيلية المتعلقة بالبوت.'],
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      }),
      { threshold: 0.14 },
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function BrandMark() {
  return <div className="brand-mark" aria-hidden="true"><span>ML</span><i /></div>;
}

function OrderModal({ open, close }: { open: boolean; close: () => void }) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({ name: '', phone: '', store: '', platform: '' });

  useEffect(() => {
    if (!open) {
      setSent(false);
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = 'اكتب اسمك.';
    if (!/^(05\d{8}|9665\d{8}|5\d{8})$/.test(form.phone.replace(/\D/g, ''))) next.phone = 'أدخل رقم جوال سعودي صحيح.';
    if (!form.store.includes('.')) next.store = 'أدخل رابط المتجر.';
    if (!form.platform) next.platform = 'اختر منصة المتجر.';
    setErrors(next);
    if (!Object.keys(next).length) setSent(true);
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={e => { if (e.target === e.currentTarget) close(); }}>
      <section className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
        <button className="icon-button modal-close" onClick={close} aria-label="إغلاق"><X size={18} /></button>
        {sent ? (
          <div className="success-state">
            <div className="success-icon"><Check /></div>
            <h3 id="order-title">بياناتك جاهزة</h3>
            <p>لإكمال الطلب أرسل تفاصيل متجرك لنا، وبنراجع التوافق ونرتب التركيب.</p>
            <a
              className="primary-btn full"
              href={`mailto:moha702m@gmail.com?subject=${encodeURIComponent('طلب شات بوت متجر - 499 ر.س')}&body=${encodeURIComponent(`الاسم: ${form.name}\nالجوال: ${form.phone}\nالمتجر: ${form.store}\nالمنصة: ${form.platform}`)}`}
            >
              إرسال الطلب للبريد <ArrowLeft size={17} />
            </a>
          </div>
        ) : (
          <>
            <p className="eyebrow">ابدأ الطلب</p>
            <h3 id="order-title">خلنا نجهز بوت متجرك</h3>
            <p className="modal-note">499 ر.س للتجهيز والتركيب — دفعة واحدة.</p>
            <form onSubmit={submit} noValidate>
              <label>
                الاسم
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="اسمك" />
                {errors.name && <small>{errors.name}</small>}
              </label>
              <label>
                رقم الجوال
                <input dir="ltr" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="05XXXXXXXX" />
                {errors.phone && <small>{errors.phone}</small>}
              </label>
              <label>
                رابط المتجر
                <input dir="ltr" value={form.store} onChange={e => setForm({ ...form, store: e.target.value })} placeholder="mystore.com" />
                {errors.store && <small>{errors.store}</small>}
              </label>
              <label>
                منصة المتجر
                <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}>
                  <option value="">اختر</option>
                  <option>سلة</option>
                  <option>زد</option>
                  <option>Shopify</option>
                  <option>WooCommerce</option>
                  <option>أخرى</option>
                </select>
                {errors.platform && <small>{errors.platform}</small>}
              </label>
              <button className="primary-btn full" type="submit">كمّل الطلب <ArrowLeft size={17} /></button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function AiDemo({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'هلا 👋 أنا مساعد متجر تجريبي. قل لي وش تدور عليه وميزانيتك، وبختصر عليك الخيارات.' },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [uses, setUses] = useState(0);
  const bottom = useRef<HTMLDivElement>(null);
  const remaining = 5 - uses;

  useEffect(() => bottom.current?.scrollIntoView({ behavior: 'smooth' }), [messages, busy]);

  const send = async (preset?: string) => {
    const text = (preset ?? input).trim();
    if (!text || busy || remaining <= 0) return;

    const next: ChatMessage[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setBusy(true);
    setError('');
    setUses(value => value + 1);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          messages: next.slice(-8).map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!response.ok) throw new Error('chat_request_failed');
      const data = await response.json() as { message: string; products?: Product[] };
      setMessages(current => [...current, { role: 'assistant', content: data.message, products: data.products }]);
    } catch {
      setError('تعذر تشغيل التجربة الآن. جرّب مرة ثانية.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={compact ? 'chat-shell compact' : 'chat-shell'}>
      <div className="chat-head">
        <div className="assistant-avatar"><Sparkles size={17} /></div>
        <div>
          <strong>مساعد المتجر الذكي</strong>
          <span><i /> تجربة مباشرة بالذكاء الاصطناعي</span>
        </div>
        <em>{remaining > 0 ? `${remaining} رسائل متبقية` : 'انتهت التجربة'}</em>
      </div>

      <div className="chat-body">
        {messages.map((message, index) => (
          <div key={index} className={`message-row ${message.role}`}>
            <div className="bubble">
              {message.content}
              {message.products?.length ? (
                <div className="products">
                  {message.products.slice(0, 2).map(product => (
                    <div className="product" key={`${product.name}-${product.price}`}>
                      <div>
                        <b>{product.name}</b>
                        <span>{product.reason}</span>
                      </div>
                      <strong>{product.price} ر.س</strong>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
        {busy && <div className="message-row assistant"><div className="bubble typing"><i /><i /><i /></div></div>}
        {error && <button className="chat-error" onClick={() => setError('')}>{error}</button>}
        <div ref={bottom} />
      </div>

      {!compact && messages.length < 3 && (
        <div className="prompt-row">
          {prompts.map(prompt => <button key={prompt} onClick={() => send(prompt)} disabled={busy}>{prompt}</button>)}
        </div>
      )}

      <div className="chat-input">
        <input
          aria-label="رسالتك للبوت"
          value={input}
          onChange={e => setInput(e.target.value.slice(0, 240))}
          onKeyDown={e => { if (e.key === 'Enter') send(); }}
          placeholder={remaining > 0 ? 'مثلاً: أبي هدية بحدود 300 ريال...' : 'انتهت التجربة المجانية'}
          disabled={remaining <= 0}
        />
        <button aria-label="إرسال الرسالة" onClick={() => send()} disabled={!input.trim() || busy || remaining <= 0}>
          <span>إرسال</span><Send size={16} />
        </button>
      </div>
    </div>
  );
}

export default function Landing() {
  useReveal();
  const [order, setOrder] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="site-shell">
      <OrderModal open={order} close={() => setOrder(false)} />
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <header className="nav">
        <a className="brand" href="#top"><BrandMark /><span>Mohammed Lab<small>محمد لاب</small></span></a>
        <button className="nav-cta" onClick={() => setOrder(true)}>اطلب البوت <ArrowLeft size={16} /></button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy" data-reveal>
            <div className="pill"><span className="live-dot" /> شات بوت ذكي لمتجرك <b>499 ر.س</b></div>
            <h1>كل سؤال بدون جواب،<br /><span>عميل ممكن تخسره.</span></h1>
            <p>بوت يفهم منتجات متجرك، يسأل العميل عن احتياجه، يرشّح له الأنسب، ويوصله للشراء بدل ما يضيع بين الصفحات.</p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => setOrder(true)}>ركّبه على متجري <ArrowLeft size={18} /></button>
              <a className="secondary-btn" href="#assistant">جرّب البوت بنفسك <MessageCircle size={17} /></a>
            </div>
            <div className="trust-line">
              <span><Check size={15} /> تجهيز وتركيب</span>
              <span><Check size={15} /> دفعة واحدة</span>
              <span><Check size={15} /> دعم بعد التركيب</span>
            </div>
          </div>

          <div className="hero-visual" id="assistant" data-reveal>
            <div className="phone-glow" />
            <AiDemo />
          </div>
        </section>

        <section className="loss-strip" data-reveal>
          <p>العميل يسأل</p><ArrowLeft /><p className="muted">ما يلقى رد</p><ArrowLeft /><p className="danger">يطلع من المتجر</p>
          <span className="separator" />
          <p>البوت يرد</p><ArrowLeft /><p>يفهم</p><ArrowLeft /><p className="success">يوجهه للشراء</p>
        </section>

        <section className="benefits section" data-reveal>
          <div className="section-heading">
            <p className="eyebrow">مو FAQ آلي</p>
            <h2>مساعد بيع داخل متجرك.</h2>
            <p>الفرق أنه ما ينتظر سؤال واضح؛ يفهم النية، يضيّق الخيارات، ويقرب العميل من قرار الشراء.</p>
          </div>
          <div className="benefit-grid">
            {benefits.map(([title, text], index) => (
              <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </section>

        <section className="process section" data-reveal>
          <div className="section-heading"><p className="eyebrow">ثلاث خطوات</p><h2>أنت ترسل الرابط. إحنا نضبط الباقي.</h2></div>
          <div className="process-grid">
            <article><b>01</b><h3>ترسل رابط متجرك</h3><p>نشوف المنتجات والمحتوى وطريقة البيع.</p></article>
            <article><b>02</b><h3>نبني معرفة البوت</h3><p>نضبط الردود، الأسلوب، الترشيحات وحدود المعلومات.</p></article>
            <article><b>03</b><h3>نركبه ونختبره</h3><p>نراجع تجربة الجوال والأسئلة الأساسية قبل التسليم.</p></article>
          </div>
        </section>

        <section className="price-section section" data-reveal>
          <div className="price-card">
            <div className="price-top">
              <div><p className="eyebrow">عرض واضح. بدون باقات.</p><h2>شات بوت ذكي للمتاجر</h2></div>
              <div className="price"><strong>499</strong><span>ر.س</span><small>دفعة واحدة</small></div>
            </div>
            <div className="price-list">
              <span><Check /> تجهيز البوت على محتوى المتجر</span>
              <span><Check /> ضبط أسلوب الرد والبيع</span>
              <span><Check /> ترشيح المنتجات حسب احتياج العميل</span>
              <span><Check /> ربطه بالمتجر حسب التوافق الفني</span>
              <span><Check /> مساعدة تشغيلية بعد التركيب</span>
            </div>
            <button className="primary-btn full" onClick={() => setOrder(true)}>ابدأ الآن بـ 499 ر.س <ArrowLeft size={18} /></button>
            <p className="aftercare"><Zap size={16} /> بعد الشراء أنت عميل عندنا. إذا واجهتك مشكلة في البوت، تواصل معنا.</p>
          </div>
        </section>

        <section className="faq section" data-reveal>
          <div className="section-heading narrow"><p className="eyebrow">قبل ما تطلب</p><h2>أربع إجابات تكفي.</h2></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <button key={question} className={faqOpen === index ? 'faq-item open' : 'faq-item'} onClick={() => setFaqOpen(faqOpen === index ? null : index)}>
                <span><b>{question}</b><ChevronDown size={18} /></span>
                <p>{answer}</p>
              </button>
            ))}
          </div>
        </section>

        <section className="final-cta section" data-reveal>
          <div className="cta-icon"><ShoppingBag /></div>
          <h2>خل متجرك يجاوب ويبيع<br />وأنت مشغول.</h2>
          <p>499 ر.س للتجهيز والتركيب. بعدها إذا احتجتنا، أنت تعرف وين تلقانا.</p>
          <button className="primary-btn" onClick={() => setOrder(true)}>اطلب البوت الآن <ArrowLeft size={18} /></button>
        </section>
      </main>

      <footer>
        <div className="brand footer-brand"><BrandMark /><span>Mohammed Lab<small>محمد لاب</small></span></div>
        <a href="mailto:moha702m@gmail.com">moha702m@gmail.com</a>
        <small>© {year}</small>
      </footer>

      <div className={chatOpen ? 'floating-chat open' : 'floating-chat'}>
        {chatOpen ? (
          <div className="float-panel">
            <div className="float-title"><div><Sparkles size={17} /> جرّب المساعد</div><button onClick={() => setChatOpen(false)} aria-label="إغلاق الشات"><X size={17} /></button></div>
            <AiDemo compact />
          </div>
        ) : (
          <button className="float-trigger" onClick={() => setChatOpen(true)} aria-label="فتح تجربة الشات"><MessageCircle /><span>جرّب البوت</span></button>
        )}
      </div>
    </div>
  );
}
