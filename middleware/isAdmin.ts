import check_role from './_checkRole'
export default function(ctx) {
  ctx.role = 'admin'
  check_role(ctx)
}
