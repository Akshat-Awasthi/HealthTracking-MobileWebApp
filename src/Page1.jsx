import React, { useState, useRef } from 'react';
import goal from "./pics/goal.png";
import heart from "./pics/heart.png";
import read from "./pics/read.png";
import sleep from "./pics/sleep.png";
import walk from "./pics/walk.png";
import water from "./pics/water.png";
import arrow from "./pics/arrow.png";
import workout from "./pics/workout.png";
import { FaCheck } from "react-icons/fa";
import Draggable from 'react-draggable';

const Page1 = () => {
    const colours = ['bg-[#9E4CB8]', 'bg-[#D15439]', 'bg-[#81B47D]', 'bg-[#63A7A7]', 'bg-[#5A92CB]'];
    const Goal = [
        { task: "Workout for 20 mins", icon: workout },
        { task: "Read book for 15 mins", icon: read },
        { task: "30 mins walk", icon: walk },
        { task: "Sleep at 11 sharp", icon: sleep },
        { task: "Drink 3L water", icon: water },
    ];
    const Percentage = ['100', '80', '60', '40', '20', '0'];
    const Graph = [
        { label: '28/4', value: '92' },
        { label: '30/4', value: '100' },
        { label: '02/5', value: '98' },
        { label: '05/5', value: '90' },
        { label: '11/5', value: '84' },
        { label: '15/5', value: '82' },
        { label: '17/5', value: '80' },
        { label: '28/5', value: '80' }
    ];
    const [checked, setChecked] = useState(Array(Goal.length).fill(false));
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
    const dragDivRef = useRef(null);

    const handleClick = (index) => {
        const updatedChecked = [...checked];
        updatedChecked[index] = !updatedChecked[index];
        setChecked(updatedChecked);
    };

    const handleSwipeRight = () => {
        setChecked(Array(Goal.length).fill(true));
    };

    const handleDragStop = (_e, data) => {
        const dragDivWidth = dragDivRef.current ? dragDivRef.current.offsetWidth : 0;
        if (data.x >= 0.5 * dragDivWidth) {
            handleSwipeRight();
        }
        setDragPosition({ x: 0, y: 0 });
    };

    const completedCount = checked.filter((isChecked) => isChecked).length;
    const progress = (completedCount / Goal.length) * 100;

    return (
        <div className='h-[1200px] overflow-y-auto'>
            <div className='bg-[#212322]'>
                <div className='flex justify-center'>
                    <div className='w-[320px] h-[78px] flex flex-row mt-10 rounded-2xl bg-gradient-to-br from-blue-300 to-blue-700'>
                        <img src={goal} alt="goal" className='w-[60px] h-[55px] mt-[10px] ml-4' />
                        <div className='flex flex-col justify-center'>
                            <div className='ml-3'>
                                <h1 className='text-[#FFFFFF] text-[14px] font-medium'>Your Daily Goal Almost Done</h1>
                                <p className='text-[#E1EAF2] mt-0 text-xs'>{completedCount} of {Goal.length} Completed</p>
                                <div className="w-full h-1 bg-blue-700 mt-2 rounded-full overflow-hidden">
                                    <div className="h-full bg-white" style={{ width: `${progress}%` }}></div>
                                </div>
                                <p className='text-[10px] text-white ml-48'>{Math.round(progress)}%</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col'>
                    <div className='flex flex-row m-4'>
                        <h1 className='text-white flex-1 text-[16px]'>Today's Goal</h1>
                        <img src={heart} alt="heart gif" />
                    </div>
                    <div>
                        {Goal.map((goal, i) => (
                            <div key={i} className='flex flex-row h-[65px] w-full bg-[#282828] rounded-2xl mb-2'>
                                <img src={goal.icon} alt="icon" className='h-2/3 mt-3 m-5' />
                                <p className='text-[#EBE9E8] text-[16px] mt-[20px] flex-1'>{goal.task}</p>
                                <div onClick={() => handleClick(i)} className={`w-[40px] h-[40px] flex justify-center items-center ${colours[i % colours.length]} m-3 rounded-xl`}>
                                    <div className={`${checked[i] ? 'block' : 'hidden'}`}>
                                        <FaCheck style={{ color: 'white', width: '14px', height: '24px' }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='flex justify-center mt-4'>
                    <div ref={dragDivRef} className='w-[320px] h-[50px] flex items-center justify-center bg-[#D15439] rounded-3xl relative'>
                        <div className='flex items-center'>
                            <Draggable
                                axis="x"
                                bounds="parent"
                                position={dragPosition}
                                onStop={handleDragStop}
                                onDrag={(e, data) => setDragPosition({ x: data.x, y: 0 })}
                            >
                                <div className='ml-2 h-[40px] w-[40px] bg-white rounded-full cursor-pointer flex items-center justify-center'>
                                    <p className='text-xs text-[#D15439]'>Track</p>
                                </div>
                            </Draggable>
                            <div className='text-white text-sm ml-10'>Swipe to Track all</div>
                            <div className='pl-12'><img src={arrow} alt="arrow" /></div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row w-full h-[280px] bg-[#282828] m-1 mt-10 justify-center  rounded-2xl'>
                    <div className='flex flex-row'>
                        <div className='flex flex-col mt-5 '>
                            {Percentage.map((percent) => (
                                <p key={percent} className='text-[#B5B5B5] text-[10px] mb-[26px]'>{percent}%</p>
                            ))}
                        </div>
                        <div className='flex flex-row ml-4 mt-4 h-[500px]'>
                            {Graph.map((progress) => (
                                <div key={progress.label}>
                                    <div className="relative w-[13px] h-[220px] ml-4 rounded-sm overflow-hidden flex items-end">
                                        <div className="bg-[#5A92CB] absolute bottom-0" style={{ height: `calc(${progress.value}% - 10px)`, width: '100%' }}></div>
                                        <p className="absolute text-[#EBE9E8] ml-[1px] text-[7px]" style={{ bottom: `calc(${progress.value}% - 10px)` }}>{progress.value}</p>
                                    </div>
                                    <div><p className='text-[#B5B5B5] text-[9px] ml-2 pl-1'>{progress.label}</p></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Page1;
