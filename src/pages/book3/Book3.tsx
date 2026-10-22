/*
 * Лендинг книги «Ленивый бюджет» — страница /book-3.
 * Перенесено 1:1 из HTML-версии. Тексты можно править прямо здесь.
 * Классы, id и data-атрибуты не переименовывать: на них завязаны стили (book3.css)
 * и анимации (book3-runtime.ts).
 */
import { useEffect, useRef, type CSSProperties } from "react";
import "./book3.css";
import { initLazyBudget } from "./book3-runtime";
import coverStack from "@/assets/book3/cover-stack.webp";
import bookOpen from "@/assets/book3/book-open.webp";
import authorPhoto from "@/assets/book3/author.jpg";
import pgLogo from "@/assets/book3/pg-logo.png";

export default function Book3() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    return initLazyBudget(rootRef.current);
  }, []);

  return (
    <div className="lb3" ref={rootRef}>
      {/* липкая полоса книги */}
      <div className="bbar" id="bbar" aria-label="Оглавление страницы">
        <div className="wrap">
          <a className="bb-t" href="#hero" aria-label="К началу страницы">
            <svg viewBox="-26 -26 52 52" aria-hidden="true"><path className="gear" id="bb-gear" /><circle r="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.4" /></svg>
            <span>Ленивый бюджет</span>
          </a>
          <button className="bb-m" id="bb-m" type="button" aria-expanded="false" aria-controls="bb-dd"><b id="bb-cur">Ленивый бюджет</b><i className="chev" aria-hidden="true"></i></button>
          <nav className="bb-n" id="bb-n">
            <a href="#change" data-s="change">Ваши изменения</a>
            <a href="#why" data-s="why">Почему эта книга</a>
            <a href="#contents" data-s="contents">Содержание</a>
            <a href="#chapter" data-s="chapter">Первая глава</a>
            <a href="#author" data-s="author">Об&nbsp;авторе</a>
          </nav>
          <a className="btn sm" href="#preorder">Предзаказ</a>
        </div>
        <div className="bb-p" id="bb-p"></div>
        <div className="bb-dd" id="bb-dd" hidden>
          <a href="#change" data-s="change">Ваши изменения</a>
          <a href="#why" data-s="why">Почему эта книга</a>
          <a href="#contents" data-s="contents">Содержание</a>
          <a href="#chapter" data-s="chapter">Первая глава</a>
          <a href="#author" data-s="author">Об&nbsp;авторе</a>
        </div>
      </div>

      <main>
      {/* 1. первый экран */}
      <section className="hero" id="hero">
        <div className="wrap">
          <div className="hero-l">
            <h1>Проблема не&nbsp;в&nbsp;том,<br />что не&nbsp;хватает денег.<br />А&nbsp;в&nbsp;том, что <span className="acc" data-ink="under" data-a="ink" data-pd=".5">нет системы</span>.</h1>
            <p className="lead"><span>Пошаговая система от&nbsp;бюджета до&nbsp;инвестиций,<br />собранная на&nbsp;1 500+ разобранных личных бюджетах</span></p>
            <div className="ctas">
              <a className="btn" href="#preorder">Оформить предзаказ</a>
              <a className="btn o" href="#chapter">Читать первую главу бесплатно</a>
            </div>
            <p className="fact">Средний клиент автора: <b>+14%</b> к&nbsp;доходам и <b>−8%</b> к&nbsp;расходам за&nbsp;3–6&nbsp;месяцев</p>
          </div>
          <div className="cover-wrap">
            <div className="fog hfog" id="hero-fog" aria-hidden="true"></div>
            <img className="hero-img" src={coverStack} width="1100" height="846" alt="Книга «Ленивый бюджет», Василий Мещеряков" />
          </div>
        </div>
      </section>

      {/* 2. полоса доверия */}
      <section className="trust" id="trust">
        <div className="wrap">
          <div className="tgrid" data-a="up" id="tgrid">
            <div className="tc"><div className="big pg"><img src={pgLogo} width="52" height="52" alt="P&G" /></div><div className="cap">Ex-директор по&nbsp;продажам</div></div>
            <div className="tc"><div className="big"><span data-count="1500">1 500</span>+</div><div className="cap">Личных бюджетов разобрано</div></div>
            <div className="tc"><div className="big"><span data-count="13000">13 000</span></div><div className="cap">Читателей канала</div></div>
            <div className="tc"><div className="big"><span data-count="14">14</span><em>лет</em></div><div className="cap">Корпоративной карьеры</div></div>
            <div className="tc"><div className="big"><span data-count="6">6</span><em>млрд ₽</em></div><div className="cap">Бюджет в&nbsp;управлении</div></div>
          </div>
        </div>
      </section>

      {/* 3. хук */}
      <section className="hook" id="hook" data-a="hook" aria-label="Главный вопрос книги">
        <div className="wrap">
          <p><span className="hk-in"><span className="hw" style={{ "--i": 0 } as CSSProperties}>Это</span> <span className="hw" style={{ "--i": 1 } as CSSProperties}>ваша</span> <span className="hl" data-ink="circle" data-col="bg" data-w="3.5" data-pd="1.1" data-pdur="1.1"><span className="hw" style={{ "--i": 2 } as CSSProperties}>лучшая</span> <span className="hw" style={{ "--i": 3 } as CSSProperties}>жизнь</span></span><br /><span className="hw" style={{ "--i": 4 } as CSSProperties}>за</span>&nbsp;<span className="hw" style={{ "--i": 5 } as CSSProperties}>эти</span> <span className="hw" style={{ "--i": 6 } as CSSProperties}>деньги?</span></span></p>
        </div>
      </section>

      {/* 4. проблема */}
      <section className="sec problem" id="problem">
        <div className="fog" id="prob-fog" aria-hidden="true"></div>
        <div className="wrap">
          <h2 className="h2" data-a="up">Финансовый туман страшнее любой правды</h2>
          <div className="pgrid">
            <div className="pcard" data-a="fog" style={{ "--i": 0 } as CSSProperties}><span className="n">01</span><p>Годами ждёте, что руководитель сам заметит вас и&nbsp;повысит зарплату.</p></div>
            <div className="pcard" data-a="fog" style={{ "--i": 1 } as CSSProperties}><span className="n">02</span><p>Зарабатываете нормально, а&nbsp;к&nbsp;концу месяца всё равно ноль.</p></div>
            <div className="pcard" data-a="fog" style={{ "--i": 2 } as CSSProperties}><span className="n">03</span><p>Уже скачивали приложение, заводили таблицу, но&nbsp;продержались две недели.</p></div>
            <div className="pcard" data-a="fog" style={{ "--i": 0 } as CSSProperties}><span className="n">04</span><p>Смотрите на&nbsp;траты и&nbsp;ругаете себя «опять перетратил».</p></div>
            <div className="pcard" data-a="fog" style={{ "--i": 1 } as CSSProperties}><span className="n">05</span><p>Считали: «откладываю 80&nbsp;тыс. в&nbsp;месяц, за&nbsp;пять лет будет почти 5&nbsp;млн». А&nbsp;через пять лет на&nbsp;счёте 500&nbsp;тысяч.</p></div>
            <div className="pcard" data-a="fog" style={{ "--i": 2 } as CSSProperties}><span className="n">06</span><p>Хочется в&nbsp;инвестиции, но&nbsp;страшно: вдруг деньги понадобятся, когда акции на&nbsp;дне.</p></div>
          </div>
          <p className="pconc" data-a="up"><i>Дело не&nbsp;в&nbsp;нехватке денег и&nbsp;не&nbsp;в&nbsp;слабой силе воли.</i><b>Дело в&nbsp;том, что нет системы, которая подходит лично вам.</b></p>
        </div>
      </section>

      {/* 5. что изменится */}
      <section className="sec change" id="change">
        <div className="wrap">
          <h2 className="h2 one" data-a="up">Что изменится, когда система заработает</h2>
          <div className="chg" id="chg">
            <div className="chg-h"><span>Было</span><span></span><span>Станет</span></div>
            <div className="chg-r"><div className="bef"><span>Деньги уходят «куда-то»</span></div><div className="arr" aria-hidden="true">→</div><div className="aft">Вы&nbsp;знаете, сколько приходит, куда уходит и&nbsp;сколько остаётся</div></div>
            <div className="chg-r"><div className="bef"><span>Непонятно, сколько продержитесь без зарплаты</span></div><div className="arr" aria-hidden="true">→</div><div className="aft">Знаете, на&nbsp;сколько месяцев хватит подушки</div></div>
            <div className="chg-r"><div className="bef"><span>«Когда-нибудь начну инвестировать»</span></div><div className="arr" aria-hidden="true">→</div><div className="aft">Видите, сколько реально можно вложить и&nbsp;какую прибавку к&nbsp;пенсии это даст</div></div>
            <div className="chg-r"><div className="bef"><span>Доход растёт только на&nbsp;индексацию</span></div><div className="arr" aria-hidden="true">→</div><div className="aft">У&nbsp;вас есть план роста, по&nbsp;два действия в&nbsp;месяц</div></div>
            <div className="chg-r"><div className="bef"><span>Переживаете о&nbsp;деньгах, когда уже поздно</span></div><div className="arr" aria-hidden="true">→</div><div className="aft">Переживаете заранее, пока можно спокойно принять решение</div></div>
          </div>
        </div>
      </section>

      {/* 6. почему эта книга */}
      <section className="sec" id="why" style={{ paddingTop: 0 } as CSSProperties}>
        <div className="wrap">
          <h2 className="h2 two" data-a="up">Почему эта книга&nbsp;— не&nbsp;очередной<br />сборник финансовых советов</h2>
          <div className="why-l" data-a="up">
            <div className="acc-i"><button className="acc-b" type="button" aria-expanded="false" aria-controls="w1" id="w1b"><span className="n">01</span><span className="t">Начинаем с&nbsp;плана, а&nbsp;не&nbsp;с&nbsp;подсчёта трат</span><span className="plus" aria-hidden="true"></span></button>
              <div className="acc-p" id="w1" role="region" aria-labelledby="w1b"><div><p className="in">«В&nbsp;прошлом денег нет». Принцип шестерёнок: план → факт → новый план. Ошибки первого плана исправляются сами за&nbsp;три цикла.</p></div></div></div>
            <div className="acc-i"><button className="acc-b" type="button" aria-expanded="false" aria-controls="w2" id="w2b"><span className="n">02</span><span className="t">Формат подбирается под вас</span><span className="plus" aria-hidden="true"></span></button>
              <div className="acc-p" id="w2" role="region" aria-labelledby="w2b"><div><p className="in">В&nbsp;книге 19 способов вести бюджет&nbsp;— от&nbsp;Excel до&nbsp;тетради карандашом. «Свой неправильный способ всегда лучше, чем чужой правильный». Сила воли не&nbsp;нужна.</p></div></div></div>
            <div className="acc-i"><button className="acc-b" type="button" aria-expanded="false" aria-controls="w3" id="w3b"><span className="n">03</span><span className="t">В&nbsp;каждой главе два слоя</span><span className="plus" aria-hidden="true"></span></button>
              <div className="acc-p" id="w3" role="region" aria-labelledby="w3b"><div><p className="in">Базовые советы для тех, кто только начинает, и&nbsp;авторские инструменты для тех, кто уже ведёт бюджет.</p></div></div></div>
            <div className="acc-i"><button className="acc-b" type="button" aria-expanded="false" aria-controls="w4" id="w4b"><span className="n">04</span><span className="t">Правильный порядок</span><span className="plus" aria-hidden="true"></span></button>
              <div className="acc-p" id="w4" role="region" aria-labelledby="w4b"><div><div className="in"><p>Сначала бюджет, потом активы для жизни, потом инвестиции. Пока не&nbsp;наведён порядок на&nbsp;первых ступенях, инвестиции разваливаются при первой серьёзной сложности.</p>
                <div className="stairs" id="stairs" aria-hidden="true"><div className="st"><span>Бюджет</span></div><div className="st"><span>Активы для жизни</span></div><div className="st"><span>Инвестиции</span></div><i className="walker"></i></div></div></div></div></div>
            <div className="acc-i"><button className="acc-b" type="button" aria-expanded="false" aria-controls="w5" id="w5b"><span className="n">05</span><span className="t">Только проверенное</span><span className="plus" aria-hidden="true"></span></button>
              <div className="acc-p" id="w5" role="region" aria-labelledby="w5b"><div><p className="in">Способ роста дохода попадает в&nbsp;книгу, только если сработал минимум у&nbsp;трёх реальных людей. Чего в&nbsp;книге нет: бинарных опционов, сетевого маркетинга, крипты как быстрого дохода, курсов «миллионер за&nbsp;месяц».</p></div></div></div>
          </div>
        </div>
      </section>

      {/* 7. содержание */}
      <section className="sec" id="contents" style={{ paddingTop: 0 } as CSSProperties}>
        <div className="wrap">
          <h2 className="h2" data-a="up">Что внутри</h2>
          <p className="sub" data-a="up">12&nbsp;глав, 2&nbsp;части, практическое задание после каждой главы, 30+ ответов на&nbsp;частые вопросы</p>
          <div className="cont" data-a="up">
            <div className="acc-i"><button className="acc-b" type="button" aria-expanded="true" aria-controls="p1" id="p1b"><span className="n">I</span><span className="t">Часть 1. Очень нелегкие&nbsp;– первые шаги</span><i className="chev" aria-hidden="true"></i></button>
              <div className="acc-p open" id="p1" role="region" aria-labelledby="p1b"><div><div className="in">
                <div className="chap"><span className="k">Глава 1</span><span className="v">Почему все боятся слова «бюджет» как&nbsp;огня?</span></div>
                <div className="chap"><span className="k">Глава 2</span><span className="v">Принцип шестерёнок: вечный двигатель ваших финансов<span className="key">Ключевая по&nbsp;мнению автора</span></span></div>
                <div className="chap"><span className="k">Глава 3</span><span className="v">Ищем серые зоны в&nbsp;расходах</span></div>
                <div className="chap"><span className="k">Глава 4</span><span className="v">Дерево роста доходов</span></div>
                <div className="chap"><span className="k">Глава 5</span><span className="v">17&nbsp;способов роста дохода<span className="key">Ключевая по&nbsp;мнению автора</span></span></div>
                <div className="chap"><span className="k">Глава 6</span><span className="v">Денежный поток</span></div>
                <div className="chap"><span className="k">Глава 7</span><span className="v">Активы для жизни и&nbsp;подушка безопасности</span></div>
                <div className="chap"><span className="k">Вопросы</span><span className="v">Частые вопросы и&nbsp;ответы&nbsp;— Часть&nbsp;1</span></div>
              </div></div></div></div>
            <div className="acc-i"><button className="acc-b" type="button" aria-expanded="false" aria-controls="p2" id="p2b"><span className="n">II</span><span className="t">Часть 2. Инвестиции</span><i className="chev" aria-hidden="true"></i></button>
              <div className="acc-p" id="p2" role="region" aria-labelledby="p2b"><div><div className="in">
                <div className="chap"><span className="k">Глава 8</span><span className="v">Инвестиционный долгосрочный план</span></div>
                <div className="chap"><span className="k">Глава 9</span><span className="v">Инвестиционный поток: от&nbsp;депозита до&nbsp;облигаций</span></div>
                <div className="chap"><span className="k">Глава 10</span><span className="v">Введение в&nbsp;акции</span></div>
                <div className="chap"><span className="k">Глава 11</span><span className="v">Введение в&nbsp;фонды</span></div>
                <div className="chap"><span className="k">Глава 12</span><span className="v">Принципы инвестирования</span></div>
              </div></div></div></div>
            <div className="acc-i"><button className="acc-b" type="button" aria-expanded="false" aria-controls="p3" id="p3b"><span className="n">III</span><span className="t">Заключение</span><i className="chev" aria-hidden="true"></i></button>
              <div className="acc-p" id="p3" role="region" aria-labelledby="p3b"><div><div className="in">
                <div className="chap"><span className="k">Заключение</span><span className="v">Сценарий первого месяца</span></div>
              </div></div></div></div>
          </div>
        </div>
      </section>

      {/* 8. первая глава */}
      <section className="sec" id="chapter" style={{ paddingTop: 0 } as CSSProperties}>
        <div className="wrap">
          <div className="lead-card" data-a="up">
            <div className="lc-l">
              <h2 className="h2">Прочитайте первую главу перед покупкой</h2>
              <p className="txt">Шесть базовых форматов бюджета и&nbsp;как понять, какой ваш. За&nbsp;один вечер у&nbsp;вас будет план на&nbsp;три месяца.</p>
            </div>
            <div className="lc-r">
              <form className="lform" id="lform" noValidate>
                <div className="fld"><input id="f-name" name="name" type="text" placeholder="Имя" autoComplete="given-name" aria-label="Имя" /><span className="er" id="e-name"></span></div>
                <div className="fld"><input id="f-email" name="email" type="email" placeholder="Email" autoComplete="email" aria-label="Email" /><span className="er" id="e-email"></span></div>
                <div className="cons"><label htmlFor="f-ok"><input id="f-ok" type="checkbox" /><span>Согласен на <a href="#">обработку персональных данных</a></span></label><span className="er" id="e-ok"></span></div>
                <button className="btn" type="submit">Получить главу</button>
                <p className="lnote">Отправим главу на&nbsp;указанную почту.</p>
              </form>
              <p className="lok" id="lok" hidden>Готово! Проверьте почту.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. об авторе */}
      <section className="sec author" id="author">
        <div className="wrap">
          <div className="au-g">
            <div className="photo" data-a="up"><img src={authorPhoto} width="900" height="1350" alt="Василий Мещеряков" loading="lazy" /></div>
            <div className="au-t" data-a="up">
              <div className="au-top">
                <h2 className="h2">«Я&nbsp;начинал точно не&nbsp;с&nbsp;понимания того, как устроены деньги»</h2>
                <div className="nm">Василий Мещеряков</div>
              </div>
              <div className="au-mid">
                <p>Я&nbsp;прошёл путь до&nbsp;директора по&nbsp;продажам P&amp;G. В&nbsp;2023 году осознанно ушёл в&nbsp;собственный бизнес. Первый год жил на&nbsp;подушку безопасности&nbsp;— это было заложено в&nbsp;план заранее, поэтому обошлось без паники.</p>
                <p>Самый дорогой урок случился ещё в&nbsp;найме: руководитель забыл подать меня на&nbsp;повышение, а&nbsp;я&nbsp;узнал об&nbsp;этом слишком поздно. Потерял сумму, на&nbsp;которую можно было купить машину. С&nbsp;тех пор уверен: у&nbsp;каждого должен быть свой план роста дохода.</p>
                <p>Разобрал больше 1 500 личных бюджетов: от&nbsp;сотрудников в&nbsp;найме до&nbsp;владельца бизнеса на&nbsp;сотни миллионов, который ведёт бюджет карандашом в&nbsp;тетради.</p>
              </div>
              <div className="au-bot">
                <blockquote>«Если я&nbsp;ошибаюсь&nbsp;— заплачу собственными деньгами. Если нет&nbsp;— у&nbsp;вас в&nbsp;руках окажется один из&nbsp;немногих текстов, который не&nbsp;пытался ничего вам подсунуть»</blockquote>
                <a className="ch" href="#" target="_blank" rel="noopener">Читать канал автора →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. кому не подойдёт */}
      <section className="sec" id="notfor" style={{ paddingTop: 0 } as CSSProperties}>
        <div className="wrap">
          <h2 className="h2 one" data-a="up">Честно: кому эта книга не&nbsp;подойдёт</h2>
          <div className="nf"><ul>
            <li data-a="ink" data-delay="0"><span className="xm" data-ink="x" data-w="2.4"></span><span>Тем, кто ищет способ быстро разбогатеть. Техник «+50% к&nbsp;доходу за&nbsp;месяц» в&nbsp;книге нет.</span></li>
            <li data-a="ink"><span className="xm" data-ink="x" data-w="2.4"></span><span>Тем, кому нужно, чтобы кто-то сказал, какие акции купить. Здесь нет индивидуальных инвестиционных рекомендаций, трейдинга, форекса и&nbsp;крипты как быстрого дохода.</span></li>
            <li data-a="ink"><span className="xm" data-ink="x" data-w="2.4"></span><span>Тем, кто ищет одну «правильную» таблицу. Книга помогает найти свой формат.</span></li>
            <li data-a="ink"><span className="xm" data-ink="x" data-w="2.4"></span><span>Тем, кто не&nbsp;готов к&nbsp;регулярности. Система начинает работать с&nbsp;третьего цикла&nbsp;— примерно через три месяца.</span></li>
          </ul></div>
          <p className="nf-last" data-a="ink">Научитесь жить лучше <span className="acc" data-ink="under" data-w="3" data-pd=".3">за&nbsp;те&nbsp;же&nbsp;деньги.</span></p>
        </div>
      </section>

      {/* 11. предзаказ */}
      <section className="sec" id="preorder" style={{ paddingTop: 0 } as CSSProperties}>
        <div className="wrap">
          <div className="pre-card" data-a="ink">
            <img className="pre-img" src={bookOpen} width="1200" height="959" alt="Разворот книги «Ленивый бюджет»" loading="lazy" />
            <div className="pc-t">
              <h2 className="h2">После прочтения вы&nbsp;скажете: «Личный бюджет&nbsp;— это просто, и&nbsp;я&nbsp;буду вести его всегда»</h2>
              <p className="txt">Оформите предзаказ&nbsp;— и&nbsp;получите книгу одними из&nbsp;первых.</p>
              <div className="act"><a className="btn" href="#preorder" id="pre-btn">Оформить предзаказ</a><span className="chk" data-ink="check" data-w="3.5" data-pd=".5" aria-hidden="true"></span></div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}
