import applePay from './apple-pay.js';

export default {
  'merchants/validate': applePay['authorize-merchant'],
};
