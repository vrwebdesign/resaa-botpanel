import check_role from './_checkRole'
export default function(ctx) {
  ctx.role = 'editor'
  check_role(ctx)
}
