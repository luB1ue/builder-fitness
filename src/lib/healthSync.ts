/**
 * Builder 健康数据同步模块
 * 支持 Apple Health (HealthKit)、Google Fit、Garmin Connect
 * 通过 Capacitor 插件与原生健康 API 通信
 */

export interface HealthData {
  steps: number;
  calories: number;
  heartRate: number;
  workoutMinutes: number;
  distance: number;
  sleepHours: number;
  timestamp: string;
}

export interface WatchDevice {
  id: string;
  name: string;
  type: 'apple-watch' | 'garmin' | 'fitbit' | 'google-fit' | 'other';
  connected: boolean;
  lastSync: string | null;
  batteryLevel?: number;
}

/**
 * 模拟健康数据同步（真实环境通过 Capacitor 插件调用原生 API）
 */
export class HealthSyncService {
  private static instance: HealthSyncService;
  private syncInterval: ReturnType<typeof setInterval> | null = null;
  private listeners: Array<(data: HealthData) => void> = [];

  static getInstance(): HealthSyncService {
    if (!HealthSyncService.instance) {
      HealthSyncService.instance = new HealthSyncService();
    }
    return HealthSyncService.instance;
  }

  /** 检查设备是否支持健康 API */
  isHealthAPISupported(): boolean {
    if (typeof window !== 'undefined') {
      // iOS Safari / WebView
      if ('webkit' in window) return true;
      // Android Chrome
      if ('health' in navigator) return true;
    }
    return false;
  }

  /** 请求健康数据权限 */
  async requestPermissions(): Promise<boolean> {
    try {
      // Capacitor 环境下调用原生插件
      if (typeof window !== 'undefined' && (window as any).Capacitor) {
        // await Health.requestAuthorization({ ... });
        return true;
      }
      // Web 环境下使用 Health Connect API
      if ('health' in navigator) {
        // await (navigator as any).health.requestAuthorization([...]);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /** 读取今日健康数据 */
  async readTodayData(): Promise<HealthData> {
    // 模拟数据（真实环境从 HealthKit/Google Fit 读取）
    return {
      steps: Math.floor(Math.random() * 8000) + 2000,
      calories: Math.floor(Math.random() * 500) + 300,
      heartRate: Math.floor(Math.random() * 30) + 65,
      workoutMinutes: Math.floor(Math.random() * 60) + 15,
      distance: parseFloat((Math.random() * 5 + 1).toFixed(1)),
      sleepHours: parseFloat((Math.random() * 2 + 6).toFixed(1)),
      timestamp: new Date().toISOString(),
    };
  }

  /** 写入训练数据到健康平台 */
  async writeWorkoutData(workout: {
    type: string;
    duration: number;
    calories: number;
    distance?: number;
  }): Promise<boolean> {
    try {
      if (typeof window !== 'undefined' && (window as any).Capacitor) {
        // await Health.recordWorkout({ ... });
        console.log('[HealthSync] 写入训练数据:', workout);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /** 开始自动同步 */
  startAutoSync(intervalMs = 300000): void {
    if (this.syncInterval) return;
    this.syncInterval = setInterval(async () => {
      const data = await this.readTodayData();
      this.listeners.forEach((fn) => fn(data));
      // 保存到 localStorage
      localStorage.setItem('health_sync_data', JSON.stringify(data));
    }, intervalMs);
  }

  /** 停止自动同步 */
  stopAutoSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  /** 注册数据更新监听 */
  onHealthUpdate(callback: (data: HealthData) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== callback);
    };
  }

  /** 获取缓存的健康数据 */
  getCachedData(): HealthData | null {
    const cached = localStorage.getItem('health_sync_data');
    return cached ? JSON.parse(cached) : null;
  }
}

/**
 * 手表设备管理
 */
export class WatchManager {
  private static instance: WatchManager;
  private devices: WatchDevice[] = [];

  static getInstance(): WatchManager {
    if (!WatchManager.instance) {
      WatchManager.instance = new WatchManager();
    }
    return WatchManager.instance;
  }

  /** 扫描附近手表设备 */
  async scanDevices(): Promise<WatchDevice[]> {
    // 模拟扫描（真实环境通过 BLE / Capacitor BLE 插件）
    const saved = localStorage.getItem('watch_devices');
    if (saved) {
      this.devices = JSON.parse(saved);
      return this.devices;
    }
    // 默认模拟设备
    this.devices = [
      {
        id: 'apple-watch-1',
        name: 'Apple Watch',
        type: 'apple-watch',
        connected: false,
        lastSync: null,
        batteryLevel: 85,
      },
      {
        id: 'garmin-1',
        name: 'Garmin Forerunner',
        type: 'garmin',
        connected: false,
        lastSync: null,
        batteryLevel: 72,
      },
    ];
    localStorage.setItem('watch_devices', JSON.stringify(this.devices));
    return this.devices;
  }

  /** 连接手表 */
  async connectDevice(deviceId: string): Promise<boolean> {
    const device = this.devices.find((d) => d.id === deviceId);
    if (!device) return false;

    // 模拟连接（真实环境通过 BLE 连接）
    device.connected = true;
    device.lastSync = new Date().toISOString();
    localStorage.setItem('watch_devices', JSON.stringify(this.devices));
    return true;
  }

  /** 断开连接 */
  disconnectDevice(deviceId: string): void {
    const device = this.devices.find((d) => d.id === deviceId);
    if (device) {
      device.connected = false;
      localStorage.setItem('watch_devices', JSON.stringify(this.devices));
    }
  }

  /** 同步训练数据到手表 */
  async syncToWatch(deviceId: string, workoutData: object): Promise<boolean> {
    const device = this.devices.find((d) => d.id === deviceId);
    if (!device || !device.connected) return false;

    // 模拟同步（真实环境通过 BLE 传输）
    device.lastSync = new Date().toISOString();
    localStorage.setItem('watch_devices', JSON.stringify(this.devices));
    console.log('[WatchManager] 同步到手表:', deviceId, workoutData);
    return true;
  }

  getDevices(): WatchDevice[] {
    return this.devices;
  }
}
