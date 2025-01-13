import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from './models/userModel.mjs';

passport.use(new LocalStrategy(async (username, password, done) => 
{
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'Invalid username.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return done(null, false, { message: 'Invalid password.' });

    return done(null, user);
}));

passport.serializeUser((user, done) => 
{
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => 
{
    const user = await User.findById(id);
    done(null, user);
});

export default passport;