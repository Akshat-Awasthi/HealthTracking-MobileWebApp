import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import fire from "./pics/fire.png";
import dumbble from "./pics/dumbble.png";
import analysis from "./pics/analysis.png";
import food from "./pics/food.png";
import orangeAnalysis from "./pics/orange-analysis.png";
import orangeDumbble from "./pics/orange-dumbble.png";
import orangeFood from "./pics/orange-food.png";
import orangeFire from "./pics/orange-fire.png";

const BottomBar = () => {
    const [focusedItem, setFocusedItem] = useState(null);

    const Menu = [
        { name: "Page1", icon: fire, focusIcon: orangeFire },
        { name: "Page2", icon: dumbble, focusIcon: orangeDumbble },
        { name: "Page3", icon: food, focusIcon: orangeFood },
        { name: "Page4", icon: analysis, focusIcon: orangeAnalysis }
    ];

    const handleItemClick = (index) => {
        setFocusedItem(index);
    };

    return (
        <div className='flex flex-col h-full bg-gray-950'>
            <div className='flex-1 h-full'><Outlet /></div>
            <div className='bg-gray-900 h-14 fixed bottom-0 left-0 w-full flex justify-around items-center'>
                {
                    Menu.map((menu, index) => (
                        <Link 
                            to={`/${menu.name}`} 
                            key={menu.name} 
                            onClick={() => handleItemClick(index)} 
                            className='flex flex-col items-center'
                        >
                            <img 
                                src={index === focusedItem ? menu.focusIcon : menu.icon} 
                                alt={menu.name} 
                                className='w-[15px] h-[22px]' 
                            />
                            <span 
                                className={` text-xs ${index === focusedItem ? 'text-orange-500' : 'text-gray-500'}`}
                            >
                                {menu.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default BottomBar;
