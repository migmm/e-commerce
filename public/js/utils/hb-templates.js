const favoritosString = localStorage.getItem('favs');
const favoritos = favoritosString ? JSON.parse(favoritosString) : [];

function discount(price, discount) {
    return price - ((price * discount) / 100);
}

function finalPrice(price, discount, qty) {
    return (price - ((price * discount) / 100)) * qty;
}

function compare(lvalue, operator, rvalue, options) {

    let operators, result;

    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }

    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }

    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };

    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }

    result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
}

function listItems(from, to, context, options) {
    var item = "";
    for (var i = from, j = to; i < j; i++) {
        item = item + options.fn(context[i]);
    }
    return item;
}

function isFavorito (productId) {
    return favoritos.find(e => e.id === productId)
};

export default {
    discount,
    finalPrice,
    compare,
    listItems,
    isFavorito
}