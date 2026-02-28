import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#B19EEF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/src/assets/logos/reactbits-gh-white.svg',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#000',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}) => {

  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);

  const plusHRef = useRef(null);
  const plusVRef = useRef(null);

  const preLayerElsRef = useRef([]);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const colorTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);

  const busyRef = useRef(false);

  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  /*
  FIX #1: DO NOT push panel offscreen on load
  We leave layout control to CSS
  */
  useLayoutEffect(() => {

    const ctx = gsap.context(() => {

      const panel = panelRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel) return;

      const preLayers =
        preLayersRef.current
          ? Array.from(preLayersRef.current.querySelectorAll('.sm-prelayer'))
          : [];

      preLayerElsRef.current = preLayers;

      // ensure clean state
      gsap.set(panel, { clearProps: 'transform' });
      gsap.set(preLayers, { clearProps: 'transform' });

      gsap.set(icon, { rotate: 0 });
      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });

    });

    return () => ctx.revert();

  }, [menuButtonColor]);


  /*
  OPEN animation
  */
  const playOpen = useCallback(() => {

    if (busyRef.current) return;
    busyRef.current = true;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    openTlRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => busyRef.current = false
    });

    tl.fromTo(
      [...layers, panel],
      { xPercent: 100 },
      {
        xPercent: 0,
        duration: 0.55,
        ease: 'power4.out',
        stagger: 0.06
      }
    );

    openTlRef.current = tl;

  }, []);


  /*
  CLOSE animation
  */
  const playClose = useCallback(() => {

    if (busyRef.current) return;
    busyRef.current = true;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;

    closeTweenRef.current?.kill();

    closeTweenRef.current = gsap.to(
      [...layers, panel],
      {
        xPercent: 100,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => busyRef.current = false
      }
    );

  }, []);


  /*
  Icon animation
  */
  const animateIcon = useCallback(opening => {

    spinTweenRef.current?.kill();

    spinTweenRef.current = gsap.to(
      iconRef.current,
      {
        rotate: opening ? 225 : 0,
        duration: 0.5,
        ease: 'power3.out'
      }
    );

  }, []);


  /*
  Button color animation
  */
  const animateColor = useCallback(opening => {

    if (!toggleBtnRef.current) return;

    const targetColor =
      opening
        ? openMenuButtonColor
        : menuButtonColor;

    colorTweenRef.current?.kill();

    colorTweenRef.current =
      gsap.to(toggleBtnRef.current, {
        color: targetColor,
        duration: 0.3
      });

  }, [menuButtonColor, openMenuButtonColor]);


  /*
  Text animation
  */
  const animateText = useCallback(opening => {

    const inner = textInnerRef.current;

    if (!inner) return;

    const seq = opening
      ? ['Menu', 'Close']
      : ['Close', 'Menu'];

    setTextLines(seq);

    textCycleAnimRef.current?.kill();

    gsap.set(inner, { yPercent: 0 });

    textCycleAnimRef.current =
      gsap.to(inner, {
        yPercent: -50,
        duration: 0.4,
        ease: 'power3.out'
      });

  }, []);


  /*
  Toggle menu
  */
  const toggleMenu = useCallback(() => {

    const newState = !openRef.current;

    openRef.current = newState;
    setOpen(newState);

    if (newState) {

      onMenuOpen?.();
      playOpen();

    } else {

      onMenuClose?.();
      playClose();

    }

    animateIcon(newState);
    animateColor(newState);
    animateText(newState);

  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose
  ]);


  /*
  Close on click away
  */
  React.useEffect(() => {

    if (!closeOnClickAway || !open) return;

    const handleClick = e => {

      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target)
      ) {
        toggleMenu();
      }

    };

    document.addEventListener('mousedown', handleClick);

    return () =>
      document.removeEventListener('mousedown', handleClick);

  }, [open, closeOnClickAway, toggleMenu]);


  /*
  JSX
  */
  return (

    <div
      className={
        (className ?? '') +
        ' staggered-menu-wrapper' +
        (isFixed ? ' fixed-wrapper' : '')
      }
      data-position={position}
      data-open={open}
      style={{ '--sm-accent': accentColor }}
    >

      {/* PRELAYERS */}

      <div ref={preLayersRef} className="sm-prelayers">

        {colors.map((c, i) => (

          <div
            key={i}
            className="sm-prelayer"
            style={{ background: c }}
          />

        ))}

      </div>


      {/* HEADER */}

      <header className="staggered-menu-header">

        <img
          src={logoUrl}
          className="sm-logo-img"
          alt="Logo"
        />

        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          onClick={toggleMenu}
        >

          <span className="sm-toggle-textWrap">

            <span
              ref={textInnerRef}
              className="sm-toggle-textInner"
            >

              {textLines.map((t, i) =>
                <span key={i}>{t}</span>
              )}

            </span>

          </span>

          <span ref={iconRef} className="sm-icon">

            <span
              ref={plusHRef}
              className="sm-icon-line"
            />

            <span
              ref={plusVRef}
              className="sm-icon-line"
            />

          </span>

        </button>

      </header>


      {/* PANEL */}

      <aside
        ref={panelRef}
        className="staggered-menu-panel"
      >

        <ul className="sm-panel-list">

          {items.map((it, i) => (

            <li key={i}>

              <a
                href={it.link}
                className="sm-panel-item"
              >
                {it.label}
              </a>

            </li>

          ))}

        </ul>

      </aside>

    </div>

  );

};

export default StaggeredMenu;
