# Auto instrumented tracing demo's
This repo contains a couple of demo's based on the [Angular Tour Of Heroes](https://angular.io/tutorial) and the [Symfony demo](https://github.com/symfony/demo) application. The goal of these demo's was not to test tracing itself, but to test auto-instrumenting libraries and how specific their traces are. This research was done during the first half of 2019 (as is apparent by the cherry-picked commits), when some solutions available now weren't.

Currently, there's three:
- Angular instrumented with Zipkin through [angular-tracing](https://github.com/ewhauser/angular-tracing)
- Symfony instrumented with OpenCensus [Symfony-integration](https://opencensus.io/api/php/)
- Symfony instrumented with Zipkin through [zipkin-instrumentation-symfony](https://github.com/jcchavezs/zipkin-instrumentation-symfony)

# Running

## Collector
The demo's in this repo are set-up to send their spans to localhost:9411, i.e. a Zipkin endpoint. This however doesn't mean you necessarily have to use Zipkin, but just a collector that accepts spans in the format.

## Angular-zipkin
Install the necessary modules with `yarn install`, then run the demo with `yarn start`.

## Symfony-opencensus
Install the necessary dependencies with `composer install`, then run the demo with `php bin/console server:run`
This specific demo also has an option to use the [OpenCensus PHP extension](https://github.com/census-instrumentation/opencensus-php/tree/master/ext). It is however adviced to build the plugin from source, since the pecl-version gave some problems during my own testing.
The usage of the plugin can be disabled by commenting out the `Symfony::load();` command in `src/Opencensus/OpenCensusBundle.php`

## Symfony-zipkin
Install the necessary dependencies with `composer install`, then run the demo with `php bin/console server:run`
