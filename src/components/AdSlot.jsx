/* Ad placeholder, dyznoai pattern: an empty reserved slot — NO ad-network code
   lives here. To activate a network (Monetag is planned for this site), paste
   its tag into this component, replacing the HTML comment inside the box —
   see BUILD_NOTES.md ("Ad slots"). The `position` prop only names the slot
   (below_heading / before_result / below_result / after_tools / above_cta). */
export default function AdSlot({ position }) {
  return (
    <div className={`gmt-ad gmt-ad--${position}`}>
      <span className="gmt-ad__label">Advertisement</span>
      <div
        className="gmt-ad__box"
        dangerouslySetInnerHTML={{ __html: `<!-- Ad slot: ${position} — paste ad code here -->` }}
      />
    </div>
  )
}
