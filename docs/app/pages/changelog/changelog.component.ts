import { Component } from '@angular/core';
import { IChangeLog } from '../../interfaces/IChangeLog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'uxd-changelog-page',
    templateUrl: './changelog.component.html',
    styleUrls: ['./changelog.component.less']
})
export class ChangeLogPageComponent {

    logs: IChangeLog[];

    constructor(private domSanitizer: DomSanitizer) {

        this.logs = [
            {
                version: '1.4.1',
                date: 'October 25th 2017',
                content: require('./logs/release-v1.4.1.md')
            },
            {
                version: '1.4.0',
                date: 'October 11th 2017',
                content: require('./logs/release-v1.4.0.md')
            },
            {
                version: '1.3.6',
                date: 'September 26th 2017',
                content: require('./logs/release-v1.3.6.md')
            },
            {
                version: '1.3.5',
                date: 'September 14th 2017',
                content: require('./logs/release-v1.3.5.md')
            },
            {
                version: '1.3.3',
                date: 'August 15th 2017',
                content: require('./logs/release-v1.3.3.md')
            },
            {
                version: '1.3.2',
                date: 'August 1st 2017',
                content: require('./logs/release-v1.3.2.md')
            },
            {
                version: '1.3.1',
                date: 'July 18th 2017',
                content: require('./logs/release-v1.3.1.md')
            },
            {
                version: '1.3.0',
                date: 'July 4th 2017',
                content: require('./logs/release-v1.3.0.md')
            },
            {
                version: '1.2.2',
                date: 'June 20th 2017',
                content: require('./logs/release-v1.2.2.md')
            },
            {
                version: '1.2.0',
                date: 'June 6th 2017',
                content: require('./logs/release-v1.2.0.md')
            },
            {
                version: '1.2.0-beta.1',
                date: 'May 24th 2017',
                content: require('./logs/release-v1.2.0-beta.1.md')
            },
            {
                version: '1.1.0',
                date: 'May 9th 2017',
                content: require('./logs/release-v1.1.0.md')
            },
            {
                version: '1.1.0-beta.1',
                date: 'April 25th 2017',
                content: require('./logs/release-v1.1.0-beta.1.md')
            },
            {
                version: '1.0.0',
                date: 'April 12th 2017',
                content: require('./logs/release-v1.0.0.md')
            }
        ];

        // santize blog posts
        this.logs.forEach(log => {
            log.content = domSanitizer.bypassSecurityTrustHtml(log.content) as string;
        });

    }
}