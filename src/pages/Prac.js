import React, { useState } from 'react';


var folder;
var location;
folder=[
    {
        id : 0,
        name : '폴더1',
        location : ['세종대학교', '건국대학교']
    },
    {
        id : 1,
        name : '폴더2',
        location : ['설빙','스타벅스','투썸플레이스']
    },
    {
        id : 2,
        name : '폴더3',
        location : ['세종대학교', '스타벅스']
    }
]

const MyComponent = () => {
  // 기존 내용과 새로운 내용을 상태로 관리합니다.
  const [isContentVisible, setContentVisibility] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  

  // 클릭 이벤트 핸들러를 사용하여 새로운 내용을 보여줄지 여부를 변경합니다.
  const handleClick = (folder) => {
    // isContentVisible 상태를 토글합니다. (기존 내용 보이기/가리기)
    setContentVisibility(!isContentVisible);
    setSelectedFolder(folder);
    
    // 새로운 내용을 업데이트합니다.
    // 여기서는 간단하게 랜덤한 새로운 내용을 생성하여 보여줍니다.
    //const randomContent = '새로운 내용이 나타납니다! ';
    //setNewContent(randomContent);
  };

  return (
    <div>
    <div style={{backgroundColor: 'skyblue'}}>
      {/* 기존 내용을 보여줄지 여부에 따라 조건부로 렌더링합니다. */}
      {isContentVisible ? (
        <div>
            {folder.map((data)=>(
                <button key={data.id} style={{display:'block'}} onClick={()=>handleClick(data)}>{data.name}</button>
            ))}
        </div>
      ) : (
        <div>
            <div>
                {selectedFolder && selectedFolder.location.map((loc) => <div key={loc}>{loc}</div>)}
            </div>
            <button onClick={handleClick}>목록으로</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default MyComponent;


