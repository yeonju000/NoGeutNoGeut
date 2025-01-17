const Member = require('../models/member');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

async function fetchData(email) {
    try {
        const user = await Member.findOne({ where: { email } });
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

exports.login = (req, res) => {
    res.render("mainLogin", { error: null });
};

exports.postLogin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await fetchData(email);
        if (user) {
            const isMatch = await bcrypt.compare(password, user.memberPW);
            if (isMatch) {
                req.login(user, (err) => {
                    if (err) {
                        console.error('로그인 중 오류:', err);
                        return next(err);
                    }
                    console.log('로그인 성공:', user);
                    req.session.user = user; //세션에 사용자 정보 저장
                    req.session.userID = user.memberNum;
                    req.session.userType = user.userType;
                    console.log("세션 아이디");
                    if (user.profileCreationStatus) {
                        console.log('프로필 생성 상태: true');
                        res.redirect('/main');
                    } else {
                        console.log('프로필 생성 상태: false');
                        res.redirect('/creation'); //소문자로 통일
                    }
                });
            } else {
                console.log('비밀번호가 틀렸습니다.');
                res.render("mainLogin", { error: "비밀번호가 틀렸습니다." });
            }
        } else {
            console.log('사용자를 찾을 수 없습니다.');
            res.render("mainLogin", { error: "사용자를 찾을 수 없습니다." });
        }
    } catch (error) {
        console.error('오류 발생:', error);
        res.render("mainLogin", { error: "오류가 발생했습니다." });
    }
};

exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('로그아웃 중 오류가 발생했습니다.');
        }
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('로그아웃 중 오류가 발생했습니다.');
            }
            res.redirect('/');
        });
    });
};

exports.renderSignup = (req, res) => {
    res.render('signUp', { error: null });
};

//
exports.checkEmail = async (req,res) => {
        try {
                const { email } = req.body;

                if (!email) { return res.status(400).json({ success: null, message: "이메일을 입력하셨는지 확인해주세요." });
                }

                const existingUser = await Member.findOne({
                        where: {
                                [Op.or]: [
                                        { email: email },
                                        { googleID: email }
                                ]
                        }
                });

                if (existingUser) {
                        return res.status(200).json({ success: false, message: "이미 사용 중인 이메일입니다." });
                }
                else {
                        res.status(200).json({ success: true, message: "사용 가능한 이메일입니다."});
                }

        } catch (err) {
                console.error(err);
                res.status(500).json({ success: false, message: "이메일 중복 확인에 실패하였습니다." });
        }
};


exports.signup = async (req, res) => {
    try {
        const { email, password, name, age, userType } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await Member.create({ email, memberPW: hashedPassword, name, age, userType, profileCreationStatus: false });
        res.redirect('/login');
    } catch (err) {
        console.log(err);
        res.render('signUp', { error: "회원가입 중 오류가 발생했습니다." });
    }
};
