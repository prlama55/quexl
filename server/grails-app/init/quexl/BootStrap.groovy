package quexl

import com.quexl.security.*

class BootStrap {

    def init = { servletContext ->
        def user = User.findByUsername('superadmin')?: new User(username: 'superadmin', password: 'Superadmin@123', email: 'super@gmail.com', primaryRole: 'ROLE_SUPER_ADMIN').save()
        def role = initRoles('ROLE_SUPER_ADMIN')
        if(!UserRole.findByUserAndRole(user, role)) {
            UserRole.create user, role
            UserRole.withSession {
                it.flush()
                it.clear()
            }
        }
    }
    def destroy = {
    }

    Role initRoles(String role){
        return Role.findOrSaveWhere(authority: role)
    }
}
