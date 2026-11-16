import { Fragment } from 'react'
import { isExternalHref } from '@/lib/format'
import { parsePostBody, type TextPart } from '@/lib/post-body'

type RichTextProps = {
  parts: readonly TextPart[]
}

const RichText = ({ parts }: RichTextProps) =>
  parts.map((part, index) => {
    if (part.kind === 'text') return <Fragment key={index}>{part.text}</Fragment>
    const isExternal = isExternalHref(part.href)
    return (
      <a
        key={index}
        href={part.href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="decoration-1"
      >
        {part.text}
      </a>
    )
  })

const labelCellClass = 'font-grotesk text-xs font-bold uppercase tracking-[0.1em]'

export const PostBody = ({ body }: { body: string }) => (
  <div className="mt-[clamp(48px,6vw,80px)] flex max-w-[62ch] flex-col gap-6 text-[clamp(19px,1.6vw,24px)] leading-normal">
    {parsePostBody(body).map((block, index) => {
      switch (block.kind) {
        case 'heading':
          return (
            <h2
              key={index}
              className="m-0 mt-[clamp(24px,3vw,40px)] font-grotesk text-[clamp(26px,2.6vw,40px)] font-extrabold leading-[1.05] tracking-[-0.03em]"
            >
              {block.text}
            </h2>
          )
        case 'ordered-list':
          return (
            <ol key={index} className="m-0 flex flex-col gap-2.5 pl-[1.4em]">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-1.5">
                  <RichText parts={item} />
                </li>
              ))}
            </ol>
          )
        case 'list':
          return (
            <ul key={index} className="m-0 flex flex-col gap-2 pl-[1.2em] text-[0.85em]">
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <RichText parts={item} />
                </li>
              ))}
            </ul>
          )
        case 'table':
          return (
            <div key={index} className="overflow-x-auto">
              <table className="w-full border-collapse text-[17px] leading-[1.4]">
                <thead>
                  <tr>
                    {block.head.map((cell, cellIndex) => (
                      <th
                        key={cellIndex}
                        scope="col"
                        className={`${labelCellClass} border-b border-ink pb-3 pr-4 text-left last:pr-0 first:whitespace-nowrap`}
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border-b border-line py-3.5 pr-4 align-top tabular-nums last:pr-0 first:whitespace-nowrap"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        default:
          return (
            <p key={index} className="m-0">
              <RichText parts={block.parts} />
            </p>
          )
      }
    })}
  </div>
)
