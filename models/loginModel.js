import pool from '../connection/pool.js';

export class LoginModel {

    static async getCorreo ({ usuario }) {
        try {
            const [rows] = await pool.query(
            `
            SELECT
                u.usuario,
                u.password,
                r.nombre_rol AS rol
            FROM
                usuarios u
            INNER JOIN 
                roles r 
            ON 
                u.id_rol = r.id_rol
            WHERE
                u.usuario = ?`,
            [usuario]
            )

            if (rows.length === 0) {
                throw new Error('Usuario no encontrado')
            }

            const user = rows[0]

            return {
                nombre_usuario: user.nombre_usuario,
                password: user.password,
            }

        } catch (error) {
            console.error('error al obtener el usuario', error)
            throw error
        }
    }

    static async validatePassword ({ plainPassword, hashedPassword }) {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }

    
}