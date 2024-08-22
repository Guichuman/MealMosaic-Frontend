import styles from "./menu.module.css";
import React, { FormEvent, useState, useEffect } from "react";
import { setUpAPICLient } from "../../api/api";
import { useNavigate, Link } from "react-router-dom";
import { TfiAlignJustify } from "react-icons/tfi";

interface MenuItem {
  name: string;
  path: string;
}



interface SidebarProps {
    menuItems: MenuItem[];
    isExpanded: boolean;
    toggleSidebar: () => void;
  }
  
  const Menu: React.FC<SidebarProps> = ({ menuItems, isExpanded, toggleSidebar }) => {
    return (
      <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : styles.collapsed}`}>
        <button className={styles.toggleButton} onClick={toggleSidebar}>
            <TfiAlignJustify />
        </button>
        {isExpanded && (
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className={styles.menuItem}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
export default Menu;