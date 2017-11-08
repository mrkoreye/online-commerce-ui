// Simple event bus for communicating events. Decided to use
// this approach to help with state management over vuex because
// the app is so small.
import Vue from 'vue';

const EventBus = new Vue();
export default EventBus;
