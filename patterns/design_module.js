/**
 * - Module design pattern is JS "class".
 * - Pattern provides encapsulation,
 * - Modules should be Immediately-Invoked-Function-Expression
 */

const _ = require("underscore");
const uuid = require("uuid").v4;

/**
 * Google analytics e-commerce wrapper
 * @constructor
 */
const ECommerce = (function(){
  "use strict";

  const TRACKER = "eCommerceTracker";

  const ACTION = {
    ADD_TRANSACTION: "ecommerce:addTransaction",
    ADD_ITEM: "ecommerce:addItem",
    CLEAR: "ecommerce:clear",
    SEND: "ecommerce:send"
  };

  const CATEGORY_ACTION = {
    PRINT: "print",
    LIKE: "like",
    NEWSLETTER: "newsletter",
    CREATE_ACCOUNT: "create-account"
  };

  /**
   * Normalize e-commerce action
   * @param {ECommerce.ACTION} eCommerceAction
   */
  function normalizeAction(eCommerceAction) {
    return TRACKER + "." + eCommerceAction;
  }

  /**
   * Immediately send e-commerce item
   * @param {ECommerce.CATEGORY_ACTION} categoryAction
   */
  function sendItem(categoryAction){
    var defaults = {
      id: uuid(),
      name: "name",
      category: categoryAction,
      quantity: 1
    };

    var obj = _.extend({}, defaults, { category: categoryAction });

    // imitate sending data
    console.log("ga(" + normalizeAction(ACTION.ADD_ITEM) + ", ", obj, ")");
    console.log("ga(" + normalizeAction(ACTION.SEND) + ")");
  }

  return {
    TRACKER: TRACKER,
    ACTION: ACTION,
    CATEGORY_ACTION: CATEGORY_ACTION,
    sendItem: sendItem
  }
})();

console.log("Module design pattern\n");

ECommerce.sendItem(ECommerce.CATEGORY_ACTION.LIKE);
ECommerce.sendItem(ECommerce.CATEGORY_ACTION.CREATE_ACCOUNT);