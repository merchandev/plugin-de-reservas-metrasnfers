<?php
require_once dirname( __DIR__, 2 ) . '/vendor/autoload.php';

// Simulate ABSPATH to allow loading files
if (!defined('ABSPATH')) {
    define('ABSPATH', __DIR__ . '/');
}
