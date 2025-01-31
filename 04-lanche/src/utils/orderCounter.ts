interface DailyOrders {
  [date: string]: number;
}

export class OrderCounter {
  private storageKey = 'zeenLanches_dailyOrders';
  private orders: DailyOrders;

  constructor() {
    this.orders = this.loadOrders();
  }

  private loadOrders(): DailyOrders {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    }
    return {};
  }

  private saveOrders() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.orders));
    } catch (error) {
      console.error('Error saving orders:', error);
    }
  }

  public incrementOrderCount(): number {
    const today = new Date().toISOString().split('T')[0];
    this.orders[today] = (this.orders[today] || 0) + 1;
    this.saveOrders();
    return this.orders[today];
  }

  public getTodayOrderCount(): number {
    const today = new Date().toISOString().split('T')[0];
    return this.orders[today] || 0;
  }
}