describe('updateClock', () => {
    let updateClock;

    beforeEach(async () => {
        document.body.innerHTML = '<div id="root"></div>';
        jest.useFakeTimers();
        jest.resetModules();
        ({ updateClock } = await import('./updateClock.js'));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    const setTime = (h, m, s) => {
        jest.setSystemTime(new Date(2024, 0, 1, h, m, s));
    };

    it('отображает время в формате HH:MM:SS', () => {
        setTime(14, 30, 45);
        updateClock();
        expect(document.getElementById('root').textContent).toBe('14:30:45');
    });

    it('дополняет однозначные часы нулём', () => {
        setTime(9, 30, 45);
        updateClock();
        expect(document.getElementById('root').textContent).toBe('09:30:45');
    });

    it('дополняет однозначные минуты нулём', () => {
        setTime(14, 5, 45);
        updateClock();
        expect(document.getElementById('root').textContent).toBe('14:05:45');
    });

    it('дополняет однозначные секунды нулём', () => {
        setTime(14, 30, 3);
        updateClock();
        expect(document.getElementById('root').textContent).toBe('14:30:03');
    });

    it('отображает полночь как 00:00:00', () => {
        setTime(0, 0, 0);
        updateClock();
        expect(document.getElementById('root').textContent).toBe('00:00:00');
    });

    it('отображает конец суток как 23:59:59', () => {
        setTime(23, 59, 59);
        updateClock();
        expect(document.getElementById('root').textContent).toBe('23:59:59');
    });

    it('обновляет textContent элемента #root', () => {
        setTime(10, 0, 0);
        updateClock();
        const root = document.getElementById('root');
        expect(root.textContent).not.toBe('');
    });
});
