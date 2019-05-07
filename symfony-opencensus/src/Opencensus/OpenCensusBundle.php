<?php
namespace App\Opencensus;

use OpenCensus\Trace\Tracer;
use OpenCensus\Trace\Integrations\Symfony;
use OpenCensus\Trace\Exporter\ZipkinExporter;
use Symfony\Component\HttpKernel\Bundle\Bundle;

class OpenCensusBundle extends Bundle
{
    public function boot()
    {
        if (php_sapi_name() == 'cli') {
            return;
        }

        # Comment out the line below when not using the OpenCensus php-plugin
        Symfony::load();

        $exporter = new ZipkinExporter('symfony-demo');
        Tracer::start($exporter);
    }
}
