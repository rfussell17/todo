const { todoSchema } = require('./schemas.js');
const ExpressError = require('./helpers/ExpressError');
const Todo = require('./models/todo');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateTodo = (req, res, next) => {
    const { error } = todoSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async(req, res, next) => {
    const { id } = req.params;
    const todo = await Todo.findById(id)
    if(!todo.author.equals(req.user._id)){
        req.flash('error', 'You do not have permission to do that');
        return res.redirect(`./todos/${id}`)
    }
    next();
}