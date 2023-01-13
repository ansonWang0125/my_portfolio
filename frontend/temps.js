import React, { useEffect, useState, useRef } from 'react';

// style接口
interface iStyle {
  position: any,
  left: number,
  top: number
}

const PublicRightClick = () => {
  // 显示/隐藏
  const [show, setShow] = useState<boolean>(false);
  // 改变位置
  const [style, setStyle] = useState<iStyle>({
    position: 'fixed', left: 300, top: 200
  });
  // 获得show最新值
  const showRef = useRef();
  // 右键菜单ref
  const rightClickRef = useRef<any>();
  
  // 右键点击
  const handleContextMenu = (event: any) => {
  	// 屏蔽默认右键事件
    event.preventDefault();
    // 先显示才能捕捉到右键菜单Ref
    // 否则rightClickRef将为undefined
    setShow(true);
    // 获得点击的位置
    let { clientX, clientY } = event;
    // 文档显示区的宽度
    const screenW: number = window.innerWidth;
    const screenH: number = window.innerHeight;
    // 右键菜单的宽度
    const rightClickRefW: number = rightClickRef.current.offsetWidth;
    const rightClickRefH: number = rightClickRef.current.offsetHeight;

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
  
  // 点击事件
  const handleClick = (event: any) => {
    // 聊天页面中会一直监听左键点击事件直到销毁  
    // 如果右键菜单不出现则不做逻辑处理、避免冲突
    if(!showRef.current) return;
    // 点击目标不在右键菜单里则关闭菜单
    if (event.target.parentNode !== rightClickRef.current){
      setShow(false)
    }
  };

  // 滑动关闭右键功能
  const setShowFalse = () => {
    // 如果右键菜单不出现则不做逻辑处理
    // eslint-disable-next-line no-useless-return
    if(!showRef.current) return;
    // 滚动直接关闭
    setShow(false)
  };
  
  // 生命周期监听
  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick,true);
    document.addEventListener('scroll', setShowFalse, true);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick,true);
      document.removeEventListener('scroll', setShowFalse, true);
    }
  }, []);
  
  // 副作用: show一改变就赋值showRef新的state。
  // 因为监听事件获取不到最新的state
  // 通过ref来获取。美滋滋
  useEffect(() => {
    showRef.current = show;
  }, [show]);
 
  // 渲染右键
  const renderContentMenu = () => (
    <div ref={rightClickRef as any} className="WeChatContactsAvatarTools" style={style} >
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
  // 总渲染
  return show ? renderContentMenu() : null;
};

export default React.memo(PublicRightClick);

作者：DJReact
链接：https://juejin.cn/post/6934902196446167054
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。