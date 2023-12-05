import type { Interval } from "luxon";

export type RawLesson = {
    absid: string;
    andet: null | string;
    hold: null | string;
    hold_id: null | string;
    lokale: null | string;
    lærer: null | string;
    navn: null | string;
    status: "aflyst" | "eksamen" | "normal" | "ændret" | null | string;
    tidspunkt: string;
};

export type Lesson = {
    color: string;
    textColor: string;
    class: string;
    id: string;
    interval: Interval;
    name: string;
    note: string;
    room: string;
    status: string;
    teacher: string;
}