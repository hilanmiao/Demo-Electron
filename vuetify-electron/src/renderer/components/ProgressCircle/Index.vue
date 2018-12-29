<template>
    <div class="donut">
        <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg" class="donut__svg">
            <circle id="donut-graph-x" class="donut__svg__scrim" r="70" cy="80" cx="80" stroke-width="3" stroke="#fff"
                    fill="none"/>
            <circle id="donut-graph" class="donut__svg__circle--one" r="70" cy="80" cx="80" stroke-width="6"
                    stroke="url(#purple)" stroke-linejoin="round" stroke-linecap="round" fill="none"/>

            <defs>
                <linearGradient id="purple" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#7a5bcf"/>
                    <stop offset="100%" stop-color="#8A6FD5"/>
                </linearGradient>
            </defs>

        </svg>
        <div class="donut__copy">
            <div class="donut__title">
                <span class="js-donut-figure"></span>
                <span class="donut__spic">%</span>
            </div>
            <div class="donut__completed">COMPLETED</div>
        </div>
    </div>
</template>

<script>
    import {ProgressCircle} from './ProgressCircle'

    export default {
        name: 'index',
        mounted() {
            let progress = new ProgressCircle(82, 70, 'donut')
            progress.init()
        }
    }
</script>

<style scoped type="text/css" lang="scss">
    .donut {
        position: relative;
        width: 160px;
        height: 160px;
    }

    .donut__copy {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        width: 100%;
        height: 100%;
        /*padding-top: 38px;*/
        top: 0;
        left: 0;
        position: absolute;
    }

    .donut__title {
        display: flex;
        align-items: center;
        padding-left: 10px;
        line-height: 1;
    }

    .donut__completed {
        color: #9e9e9e;
        font-weight: 600;
    }

    .donut__secondary {
        display: block;
        margin: 0;
        padding: 0;
    }

    .donut__title,
    .donut__spic {
        color: lighten(#7a5bcf, 5%);
        font-weight: 200;
    }

    .donut__title {
        font-size: 60px;
        position: relative;
        animation: donutTitleFadeLeft 800ms 200ms cubic-bezier(.99, .01, .22, .94) forwards;
        opacity: 0;
        transform: translateX(0);
    }

    .donut__spic {
        /*position: absolute;*/
        /*top: 20px;*/
        font-size: 30px;
        /*line-height: 1em;*/
        /*content: "%";*/
        animation: donutTitleFadeRight 800ms 200ms cubic-bezier(.99, .01, .22, .94) forwards;
        /*opacity: 0;*/
        /*transform: translateY(-20px);*/
    }

    @keyframes donutTitleFadeLeft {
        from {
            opacity: 0;
            transform: translateX(0);
        }

        to {
            opacity: 1;
            /*transform: translateX(-10px);*/
        }
    }

    @keyframes donutTitleFadeRight {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    $radius: 70;
    $circumference: (3.14 * (2 * $radius));

    .donut__svg {
        transform: rotate(-90deg);
    }

    .donut__svg__circle--one {
        stroke-dasharray: $circumference;
        stroke-dashoffset: $circumference;
        transition: stroke-dashoffset 1200ms cubic-bezier(.99, .01, .62, .94);
    }

    .info {
        font-size: 14px;
        color: #999;
        position: absolute;
        flex: 1;
        bottom: 40px;
        width: 100%;
        left: 0;
        text-align: center;

        a {
            color: #999;
        }
    }
</style>