import reqwest from 'reqwest'
import {api} from '../../../api'
import reqwestWithCsrf from '../../../utils/reqwest'

class MemberService {
    getMemberList(page = 1, limit = 50, ordering='date_joined', search='') {
        return reqwestWithCsrf({
            url: api('member/member'),
            type: 'json',
            data:{
                page,
                limit,
                ordering,
                search
            }
        })
    }

    getMember(memberId) {
        return reqwestWithCsrf({
            url: api('member/member/' + memberId),
            type: 'json'
        })
    }
    registerMember(name, email, lifetime) {
        return reqwestWithCsrf({
            url: api('member/member'),
            method: 'post',
            data: {
                name,
                email,
                lifetime
            },
            type: 'json'
        })
    }
    searchMember(name) {
        return reqwestWithCsrf({
            url: api('member/member'),
            data: {
                limit: 10,
                search: name
            },
            type: 'json'
        })
    }
}




export default new MemberService()