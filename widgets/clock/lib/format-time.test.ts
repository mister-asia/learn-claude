import { formatTime } from './format-time';

describe('formatTime', () => {
    const makeDate = (h: number, m: number, s: number) => new Date(2024, 0, 1, h, m, s);

    it('отображает время в формате HH:MM:SS', () => {
        expect(formatTime(makeDate(14, 30, 45))).toBe('14:30:45');
    });

    it('дополняет однозначные часы нулём', () => {
        expect(formatTime(makeDate(9, 30, 45))).toBe('09:30:45');
    });

    it('дополняет однозначные минуты нулём', () => {
        expect(formatTime(makeDate(14, 5, 45))).toBe('14:05:45');
    });

    it('дополняет однозначные секунды нулём', () => {
        expect(formatTime(makeDate(14, 30, 3))).toBe('14:30:03');
    });

    it('отображает полночь как 00:00:00', () => {
        expect(formatTime(makeDate(0, 0, 0))).toBe('00:00:00');
    });

    it('отображает конец суток как 23:59:59', () => {
        expect(formatTime(makeDate(23, 59, 59))).toBe('23:59:59');
    });
});
