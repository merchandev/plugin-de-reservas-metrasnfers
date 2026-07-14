<?php
use PHPUnit\Framework\TestCase;

class TestActivation extends TestCase {
    
    protected function setUp(): void {
        parent::setUp();
        \Brain\Monkey\setUp();
    }
    
    protected function tearDown(): void {
        \Brain\Monkey\tearDown();
        parent::tearDown();
    }
    
    public function test_plugin_constants_do_not_throw_errors_when_already_defined() {
        // Define WPTB_VERSION manually to simulate main plugin file
        if (!defined('WPTB_VERSION')) {
            define('WPTB_VERSION', '4.1.9');
        }
        
        // Mock plugin_dir_path and plugin_dir_url
        \Brain\Monkey\Functions\stubs([
            'plugin_dir_path' => '/mock/dir/',
            'plugin_dir_url'  => 'http://mock.url/'
        ]);

        // Require the file that previously caused the fatal error
        // The test passes if no PHP Notice or Warning is thrown regarding constants.
        require_once dirname(__DIR__, 2) . '/modules/booking/wp-booking-plugin.php';
        
        $this->assertEquals('4.1.9', WPTB_VERSION, 'WPTB_VERSION should retain the initial value.');
        $this->assertTrue(defined('WPTB_PLUGIN_DIR'), 'WPTB_PLUGIN_DIR should be defined.');
    }
}
