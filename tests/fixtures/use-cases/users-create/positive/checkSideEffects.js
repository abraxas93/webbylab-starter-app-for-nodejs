import Action     from '../../../../../lib/domain-model/Action.mjs';
import User       from '../../../../../lib/domain-model/User.mjs';

export default async function checkSideEffects({ userId }) {
    const user = await User.findById(userId);

    if (user.status !== 'PENDING') {
        throw new Error('User status should be "PENDING"');
    }

    const actions = await Action.findAll({ where : {
        data : { '"userId"': userId },
        type : 'ACTIVATE_USER'
    } });

    if (!actions.length) {
        throw new Error('Action with type "ACTIVATE_USER" should be created');
    }
}