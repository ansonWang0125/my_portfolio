import React, { useEffect, useState, useRef } from 'react';
import AddImage from '../AddImage'
import { stateToHTML } from "draft-js-export-html";

const RightClick = (props) => {
    //add image
    const [show, setShow] = useState(false);
    const [inserting , setInserting ] = useState(false);
    const [style, setStyle] = useState({
      position: 'fixed', left: 300, top: 200,
    });
    // 獲得show最新值
    const showRef = useRef()
    // 右键菜单ref
    const rightClickRef = useRef();

    const inputRef = useRef();

    const rightClick = props.rightClick

    // 生命周期监听
    useEffect(() => {
        const handleContextMenu = () => {
            const event = props.event
            // 屏蔽默认右键事件
            event.preventDefault();
            // 先显示才能捕捉到右键菜单Ref
            // 否则rightClickRef将为undefined
            setShow(true);
            // 获得点击的位置
            let { clientX, clientY } = event;
            // 文档显示区的宽度
            const screenW = window.innerWidth;
            const screenH = window.innerHeight;
            // 右键菜单的宽度

            const rightClickRefW = rightClickRef.current?.offsetWidth;
            const rightClickRefH = rightClickRef.current?.offsetHeight;
    
            // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下contextmenu。
            // 否则，菜单放到左边。
            const right = (screenW - clientX) > rightClickRefW;
            const top = (screenH - clientY) > rightClickRefH;
            // 赋值右键菜单离鼠标一些距离
            clientX = right ?  clientX + 6 : clientX - rightClickRefW - 6;
            clientY = top ? clientY + 6 : clientY - rightClickRefH - 6;
            setStyle({
            ...style,
            left: clientX,
            top: clientY
            });
         };
        const handleRightClick = () => {
            if (rightClick) {
                handleContextMenu()
            }else {return}
        }
        // 点击事件
        const handleClick = (event) => {
            if ( inserting ){
                console.log('inserting...')
                // props.setRightClick(false)
                setShow(true)
            }
            // 聊天页面中会一直监听左键点击事件直到销毁  
            // 如果右键菜单不出现则不做逻辑处理、避免冲突
            else if(!showRef.current )  return;
            // 点击目标不在右键菜单里则关闭菜单
            else if (!rightClickRef.current.contains(event.target)){
                props.setRightClick(false)
                setShow(false)
            }
        };
        // 滑动关闭右键功能
        const setShowFalse = () => {
            // 如果右键菜单不出现则不做逻辑处理
            // eslint-disable-next-line no-useless-return
            if(!showRef.current) return;
            // 滚动直接关闭
            props.setRightClick(false)
            setShow(false)
        };
        document.getElementById("menu").addEventListener('contextmenu', handleRightClick);
        document.getElementById("menu").addEventListener('click', handleClick,true);
        document.getElementById("menu").addEventListener('scroll', setShowFalse, true);
        document.getElementById("test").addEventListener('change', handleChange)
        return () => {
          document.getElementById("menu").removeEventListener('contextmenu', handleRightClick);
          document.getElementById("menu").removeEventListener('click', handleClick,true);
          document.getElementById("menu").removeEventListener('scroll', setShowFalse, true);
          document.getElementById("test").removeEventListener('change',handleChange)
        }
      }, [style,props.rightClick, props.event, props, rightClick, inserting]);

    // 副作用: show一改变就赋值showRef新的state。
    // 因为监听事件获取不到最新的state
    // 通过ref来获取。美滋滋
    useEffect(() => {
        showRef.current = show;
    }, [show]);

  const imageOnChange = (editorState) => {
        let options = {
            entityStyleFn: (entity)=> {
                const entityType = entity.get("type").toLowerCase();
                if (entityType === "image"){
                    const data = entity.getData();
                    return {
                        element: "img",
                        attributes: {
                            src: data.src
                        },
                        style: {
                            // width: '100px'
                        }
                    };
                }
            }
        }
        
        const valueToSend = stateToHTML(editorState.getCurrentContent(), options);
        console.log(valueToSend);
        // see this url for image example https://github.com/sstur/draft-js-utils/pull/85/files

        props.setEditorState(editorState)
    }

    const [count, setCount] = useState(0)
    const handleClick = () => {
        inputRef.current.click()
        setCount(count+1)}
    const handleChange = () => {console.log('fucke')}



    const renderContentMenu = () => (
        <div ref={rightClickRef } id='menu' className="WeChatContactsAvatarTools" style={style} >
            <div >
                <AddImage editorState={props.editorState} 
                            onChange={imageOnChange} 
                            modifier={props.modifier} 
                            setInserting={setInserting}/> 
            </div>
            <div >
                <input id='test'type='file' onClick={console.log('click')}ref={inputRef}/>
                <button onClick={handleClick} >{count}</button>
            </div>
            <div className="rightClickItems">
                Mark as unread
            </div>
            <div className="rightClickItems">
                Mute Notifications
            </div>
            <div className="rightClickItems">
                Remove
            </div>
            <div className="rightClickItems">
                Clear Chat History
            </div>

        </div>
      );
    return ((rightClick)? renderContentMenu(): null);
}

export default RightClick;