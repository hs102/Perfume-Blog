const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = express.Router();

router.get('/sign-up', (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.get('/sign-in', (req, res) => {
  // Render HTML form by default; if client prefers JSON, provide route hint
  if (req.accepts('json') && !req.accepts('html')) {
    return res.json({ message: 'POST /auth/sign-in with { username, password } to sign in.' });
  }
  res.render('auth/sign-in.ejs');
});

router.post('/sign-up', async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });

  if (userInDatabase) {
    return res.send('Username or Password is invalid');
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.send('Password and Confirm Password must match');
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10);
  req.body.password = hashedPassword;

  const newUser = await User.create(req.body);

  req.session.user = {
    username: newUser.username,
    _id: newUser._id
  };

  req.session.save(() => {
    if (req.accepts('json') && !req.accepts('html')) {
      return res.status(201).json({ user: req.session.user });
    }
    res.redirect("/");
  });
});

router.post('/sign-in', async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });

  if (!userInDatabase) {
    if (req.accepts('json') && !req.accepts('html')) {
      return res.status(401).json({ error: 'Username or Password is invalid' });
    }
    return res.send('Username or Password is invalid');
  }

  const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password);

  if (!validPassword) {
    if (req.accepts('json') && !req.accepts('html')) {
      return res.status(401).json({ error: 'Username or Password is invalid' });
    }
    return res.send('Username or Password is invalid');
  }

  req.session.user = {
    username: userInDatabase.username,
    _id: userInDatabase._id,
  };

  req.session.save(() => {
    if (req.accepts('json') && !req.accepts('html')) {
      return res.json({ user: req.session.user });
    }
    res.redirect('/');
  });
});

router.get("/sign-out", (req, res) => {
  req.session.destroy(() => {
    if (req.accepts('json') && !req.accepts('html')) {
      return res.json({ ok: true });
    }
    res.redirect("/");
  });
});

// Helpful endpoint to introspect session in JSON clients
router.get('/me', (req, res) => {
  if (req.session.user) return res.json({ user: req.session.user });
  res.status(401).json({ user: null });
});



module.exports = router;
