<?php
// Load WordPress to access $wpdb
require_once('../../../wp-load.php');

global $wpdb;

echo "=== VEHICLES ===\n";
$vehicles = $wpdb->get_results("SELECT id, name FROM {$wpdb->prefix}wptb_vehicles");
print_r($vehicles);

echo "\n=== LATEST BOOKINGS ===\n";
$bookings = $wpdb->get_results("SELECT id, vehicle_id, price FROM {$wpdb->prefix}wptb_bookings ORDER BY id DESC LIMIT 5");
print_r($bookings);
