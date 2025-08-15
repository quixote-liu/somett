import React, { useState, useEffect } from 'react';

// 定义应用信息的接口
interface AppInfo {
  name: string;
  version: string;
  path: string;
}

const App: React.FC = () => {
  // 状态管理
  const [count, setCount] = useState<number>(0);
  const [appInfo, setAppInfo] = useState<Partial<AppInfo>>({});
  const [isElectron, setIsElectron] = useState<boolean>(false);

  // 检查是否在Electron环境中并获取应用信息
  useEffect(() => {
    // 检查是否是Electron环境
    const checkElectron = () => {
      // 渲染进程中检测Electron
    //   if (window && window.process && window.process.) {
    //     return true;
    //   }
      // 主进程中检测Electron
      if (typeof process !== 'undefined' && process.versions && process.versions.electron) {
        return true;
      }
      return false;
    };

    setIsElectron(checkElectron());

    // 获取Electron应用信息
    if (checkElectron() && window.require) {
      try {
        const electron = window.require('electron');
        const app = electron.remote.app;
        
        setAppInfo({
          name: app.getName(),
          version: app.getVersion(),
          path: app.getPath('userData')
        });
      } catch (error) {
        console.error('获取Electron应用信息失败:', error);
      }
    }
  }, []);

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '2rem', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1>Electron + React + TypeScript Demo</h1>
      
      <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: isElectron ? '#e8f4fd' : '#ffebee' }}>
        <p>运行环境: {isElectron ? 'Electron' : '浏览器'}</p>
      </div>
      
      <div style={{ margin: '2rem 0' }}>
        <h2>计数器示例</h2>
        <p>当前计数: {count}</p>
        <div style={{ marginTop: '1rem' }}>
          <button 
            onClick={() => setCount(prev => prev - 1)}
            style={{ 
              padding: '0.5rem 1rem', 
              margin: '0 0.5rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            减一
          </button>
          <button 
            onClick={() => setCount(0)}
            style={{ 
              padding: '0.5rem 1rem', 
              margin: '0 0.5rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            重置
          </button>
          <button 
            onClick={() => setCount(prev => prev + 1)}
            style={{ 
              padding: '0.5rem 1rem', 
              margin: '0 0.5rem',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            加一
          </button>
        </div>
      </div>
      
      {isElectron && (
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          backgroundColor: '#f0f0f0', 
          borderRadius: '5px' 
        }}>
          <h2>应用信息</h2>
          <p>应用名称: {appInfo.name}</p>
          <p>应用版本: {appInfo.version}</p>
          <p>用户数据路径: {appInfo.path}</p>
        </div>
      )}
    </div>
  );
};

export default App;
    