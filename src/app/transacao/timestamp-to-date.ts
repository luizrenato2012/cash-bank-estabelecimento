import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name : 'timestampToDate'
})
export class TimestampToDate implements PipeTransform {

    transform( seconds: number) {
        return (seconds) ?
            new Date(seconds*1000) :
            null;
    }
}
