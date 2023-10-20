
import React, { useState, useEffect, useRef } from 'react';
import '../hojas-estilo/ExpandableMenu.css';
import logosga from "../imagenes/logoSGA.png";

const ExpandableMenu = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);
  const menuRef = useRef(null);


  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuExpanded(false);
    }
  };


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  const toggleMenu = () => {
    setMenuExpanded(!menuExpanded);
  };

//   <i class="bi bi-calendar3"></i>

  return (
    <div className={`expandable-menu ${menuExpanded ? 'expanded' : ''}`} ref={menuRef}>
      <div className="toggle-button" onClick={toggleMenu}>
        {menuExpanded? <img className='logoMenu' src={logosga}/>:
        <img className='logoMenuPeque' src={logosga}/>}
        
      </div>
      <div className="menu-content">
        <ul>
        
          <li>{menuExpanded ?     <div><i class="bi bi-calendar3"></i> Planificacion</div>:<i class="bi bi-calendar3"></i>  }</li>
          <li>{menuExpanded ?     <div><i class="bi bi-box-seam"></i> Pedidos</div>:<i class="bi bi-box-seam"></i>  }</li>
          <li>{menuExpanded ?     <div><i class="bi bi-truck"></i> Flotas</div>:<i class="bi bi-truck"></i> }</li>
          <li>{menuExpanded ?     <div><i class="bi bi-stopwatch"></i> Simulaciones</div>:<i class="bi bi-stopwatch"></i> }</li>
        </ul>
      </div>
    </div>
  );
};

export default ExpandableMenu;
