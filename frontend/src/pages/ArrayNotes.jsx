function ArrayNotes() {
    return(
        <div className="notes-page">
            <h1>📚 Arrays - Complete Notes</h1>
            <section className="note-section">
                <h2> What is an Array?</h2>
                <p>An Array is an collection of elements stored in contiguous memory locations. Every Element is accessed using its index.</p>
            </section>
            <section className="note-section">
                <h2>Characteristics</h2>
                <ul>
                    <li>Stores elements of the same data type.</li>
                    <li>Fixed size.</li>
                    <li>Fast random access using index.</li>
                    <li>Memory is continues.</li>
                </ul>
            </section>
            <section className="note-section">
                <h2>Time Complexity</h2>
                <table>
                    <thread>
                        <tr>
                            <th>Operation</th>
                            <th>Complexity</th>
                        </tr>
                    </thread>
                    <tbody>
                        <tr>
                            <td>Access</td>
                            <td>o(1)</td>
                        </tr>
                        <tr>
                            <td>Insertion</td>
                            <td>o(n)</td>
                        </tr>
                        <tr>
                            <td>Deletion</td>
                            <td>o(n)</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <section className="note-section">
                <h2>Most asked Interview Questions</h2>
                <ol>
                    <li>Two Sum</li>
                    <li>Maximum Subarray</li>
                    <li>Rotate Array</li>
                    <li>Merge Sorted Array</li>
                    <li>Move Zeroes</li>
                    <li>Best time to Buy and Sell stock</li>
                </ol>
            </section>
        </div>
    );
}
export default ArrayNotes;