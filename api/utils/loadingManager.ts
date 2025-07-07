type LoadingListener = (isLoading: boolean) => void;

class LoadingManager {
  private loadingCount: number = 0;
  private listeners: LoadingListener[] = [];

  addListener(listener: LoadingListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  incrementLoading(): void {
    this.loadingCount++;
    this.notifyListeners();
  }

  decrementLoading(): void {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    this.notifyListeners();
  }

  private notifyListeners(): void {
    const isLoading = this.loadingCount > 0;
    this.listeners.forEach(listener => listener(isLoading));
  }

  get isLoading(): boolean {
    return this.loadingCount > 0;
  }
}

export const loadingManager = new LoadingManager(); 